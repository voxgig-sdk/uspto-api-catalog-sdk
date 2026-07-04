# Trademark entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from usptoapicatalog_sdk import UsptoApiCatalogSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestTrademarkEntity:

    def test_should_create_instance(self):
        testsdk = UsptoApiCatalogSDK.test(None, None)
        ent = testsdk.Trademark(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _trademark_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "trademark." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set USPTOAPICATALOG_TEST_TRADEMARK_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        trademark_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.trademark")))
        trademark_ref01_data = None
        if len(trademark_ref01_data_raw) > 0:
            trademark_ref01_data = helpers.to_map(trademark_ref01_data_raw[0][1])

        # LIST
        trademark_ref01_ent = client.Trademark(None)
        trademark_ref01_match = {}

        trademark_ref01_list_result = trademark_ref01_ent.list(trademark_ref01_match, None)
        assert isinstance(trademark_ref01_list_result, list)

        # LOAD
        trademark_ref01_match_dt0 = {}
        trademark_ref01_data_dt0_loaded = trademark_ref01_ent.load(trademark_ref01_match_dt0, None)
        assert trademark_ref01_data_dt0_loaded is not None



def _trademark_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/trademark/TrademarkTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = UsptoApiCatalogSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["trademark01", "trademark02", "trademark03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "USPTOAPICATALOG_TEST_TRADEMARK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "USPTOAPICATALOG_TEST_TRADEMARK_ENTID": idmap,
        "USPTOAPICATALOG_TEST_LIVE": "FALSE",
        "USPTOAPICATALOG_TEST_EXPLAIN": "FALSE",
        "USPTOAPICATALOG_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("USPTOAPICATALOG_TEST_TRADEMARK_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("USPTOAPICATALOG_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("USPTOAPICATALOG_APIKEY"),
            },
            extra or {},
        ])
        client = UsptoApiCatalogSDK(helpers.to_map(merged_opts))

    _live = env.get("USPTOAPICATALOG_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("USPTOAPICATALOG_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
