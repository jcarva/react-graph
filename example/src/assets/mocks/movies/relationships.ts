export default [
  {
    "id": "92",
    "startNodeId": "42",
    "endNodeId": "0",
    "type": "creates_on",
    "properties": {}
  },
  {
    "id": "261",
    "startNodeId": "155",
    "endNodeId": "0",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "382",
    "startNodeId": "174",
    "endNodeId": "1",
    "type": "postTo",
    "properties": {
      "exchange": "bms.campaign.x",
      "routingKey": "v3.${CONTEXT:dev}_${COUNTRY:us}_${ENVIRONMENT:dev}.bms.campaign.plays.export"
    }
  },
  {
    "id": "96",
    "startNodeId": "43",
    "endNodeId": "1",
    "type": "consumesFrom",
    "properties": {
      "exchange": "bms.campaign.brand.x",
      "queue": "bms.campaign.brand.message-${CONTEXT}_${COUNTRY}_${ENVIRONMENT}.v3.q",
      "routingKey": "v3.${CONTEXT}_${COUNTRY}_${ENVIRONMENT}.bms.campaign.brand"
    }
  },
  {
    "id": "352",
    "startNodeId": "170",
    "endNodeId": "1",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "316",
    "startNodeId": "162",
    "endNodeId": "1",
    "type": "consumesFrom",
    "properties": {
      "exchange": "amfb.account.create.x",
      "queue": "amfb.account.create.message-${CONTEXT}_${COUNTRY}_${ENVIRONMENT}.v3.q",
      "routingKey": "input.amfb.account.create.message-${CONTEXT}_${COUNTRY}_${ENVIRONMENT}.v3"
    }
  },
  {
    "id": "806",
    "startNodeId": "186",
    "endNodeId": "2",
    "type": "RECEIVES",
    "properties": {
      "exchange": "events.outbound.x",
      "routingKey": "v4.${CONTEXT:stable}_${COUNTRY:us}_${ENVIRONMENT:dev}.data.vset_change.1.jukebox.vset_change",
      "queue": "venue.set.message-${CONTEXT:stable}_${COUNTRY:us}_${ENVIRONMENT:dev}.v3.q"
    }
  },
  {
    "id": "277",
    "startNodeId": "157",
    "endNodeId": "3",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "278",
    "startNodeId": "157",
    "endNodeId": "4",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "47",
    "startNodeId": "30",
    "endNodeId": "6",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "225",
    "startNodeId": "142",
    "endNodeId": "6",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "211",
    "startNodeId": "135",
    "endNodeId": "6",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "399",
    "startNodeId": "182",
    "endNodeId": "7",
    "type": "upload",
    "properties": {}
  },
  {
    "id": "150",
    "startNodeId": "119",
    "endNodeId": "7",
    "type": "upload",
    "properties": {}
  },
  {
    "id": "9",
    "startNodeId": "15",
    "endNodeId": "7",
    "type": "upload",
    "properties": {}
  },
  {
    "id": "8",
    "startNodeId": "15",
    "endNodeId": "7",
    "type": "download",
    "properties": {}
  },
  {
    "id": "4",
    "startNodeId": "14",
    "endNodeId": "7",
    "type": "download",
    "properties": {}
  },
  {
    "id": "11",
    "startNodeId": "16",
    "endNodeId": "8",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "5",
    "startNodeId": "14",
    "endNodeId": "8",
    "type": "upload",
    "properties": {}
  },
  {
    "id": "400",
    "startNodeId": "182",
    "endNodeId": "9",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "151",
    "startNodeId": "119",
    "endNodeId": "9",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "15",
    "startNodeId": "16",
    "endNodeId": "9",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "3",
    "startNodeId": "14",
    "endNodeId": "9",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "16",
    "startNodeId": "18",
    "endNodeId": "10",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "6",
    "startNodeId": "14",
    "endNodeId": "10",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "14",
    "startNodeId": "16",
    "endNodeId": "11",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "2",
    "startNodeId": "12",
    "endNodeId": "11",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "344",
    "startNodeId": "169",
    "endNodeId": "13",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "384",
    "startNodeId": "175",
    "endNodeId": "13",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "330",
    "startNodeId": "168",
    "endNodeId": "13",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "191",
    "startNodeId": "130",
    "endNodeId": "13",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "7",
    "startNodeId": "15",
    "endNodeId": "14",
    "type": "partOf",
    "properties": {}
  },
  {
    "id": "308",
    "startNodeId": "161",
    "endNodeId": "16",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "193",
    "startNodeId": "130",
    "endNodeId": "16",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "319",
    "startNodeId": "166",
    "endNodeId": "16",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "18",
    "startNodeId": "18",
    "endNodeId": "16",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "10",
    "startNodeId": "16",
    "endNodeId": "17",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "309",
    "startNodeId": "161",
    "endNodeId": "19",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "396",
    "startNodeId": "182",
    "endNodeId": "19",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "390",
    "startNodeId": "175",
    "endNodeId": "19",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "334",
    "startNodeId": "168",
    "endNodeId": "19",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "320",
    "startNodeId": "166",
    "endNodeId": "19",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "804",
    "startNodeId": "183",
    "endNodeId": "20",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "19",
    "startNodeId": "19",
    "endNodeId": "20",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "169",
    "startNodeId": "122",
    "endNodeId": "21",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "359",
    "startNodeId": "171",
    "endNodeId": "22",
    "type": "uses",
    "properties": {
      "data": "mobile player activation code"
    }
  },
  {
    "id": "324",
    "startNodeId": "167",
    "endNodeId": "22",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "349",
    "startNodeId": "170",
    "endNodeId": "23",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "350",
    "startNodeId": "170",
    "endNodeId": "23",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "373",
    "startNodeId": "172",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "235",
    "startNodeId": "148",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "392",
    "startNodeId": "175",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "366",
    "startNodeId": "170",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "346",
    "startNodeId": "169",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "322",
    "startNodeId": "166",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "380",
    "startNodeId": "174",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "354",
    "startNodeId": "170",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "326",
    "startNodeId": "167",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "340",
    "startNodeId": "168",
    "endNodeId": "24",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "58",
    "startNodeId": "33",
    "endNodeId": "34",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "82",
    "startNodeId": "39",
    "endNodeId": "40",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "83",
    "startNodeId": "39",
    "endNodeId": "41",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "93",
    "startNodeId": "42",
    "endNodeId": "41",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "101",
    "startNodeId": "100",
    "endNodeId": "42",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "170",
    "startNodeId": "123",
    "endNodeId": "44",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "378",
    "startNodeId": "174",
    "endNodeId": "45",
    "type": "readsFrom",
    "properties": {}
  },
  {
    "id": "94",
    "startNodeId": "43",
    "endNodeId": "45",
    "type": "writesTo",
    "properties": {}
  },
  {
    "id": "147",
    "startNodeId": "118",
    "endNodeId": "46",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "200",
    "startNodeId": "132",
    "endNodeId": "47",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "237",
    "startNodeId": "149",
    "endNodeId": "48",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "230",
    "startNodeId": "147",
    "endNodeId": "49",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "213",
    "startNodeId": "137",
    "endNodeId": "50",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "202",
    "startNodeId": "133",
    "endNodeId": "51",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "276",
    "startNodeId": "156",
    "endNodeId": "52",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "136",
    "startNodeId": "114",
    "endNodeId": "53",
    "type": "reads",
    "properties": {}
  },
  {
    "id": "245",
    "startNodeId": "151",
    "endNodeId": "53",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "131",
    "startNodeId": "111",
    "endNodeId": "54",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "205",
    "startNodeId": "134",
    "endNodeId": "55",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "209",
    "startNodeId": "135",
    "endNodeId": "56",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "102",
    "startNodeId": "100",
    "endNodeId": "57",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "161",
    "startNodeId": "121",
    "endNodeId": "58",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "108",
    "startNodeId": "105",
    "endNodeId": "58",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "195",
    "startNodeId": "131",
    "endNodeId": "59",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "182",
    "startNodeId": "128",
    "endNodeId": "59",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "100",
    "startNodeId": "96",
    "endNodeId": "59",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "49",
    "startNodeId": "30",
    "endNodeId": "59",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "137",
    "startNodeId": "114",
    "endNodeId": "60",
    "type": "reads",
    "properties": {}
  },
  {
    "id": "138",
    "startNodeId": "114",
    "endNodeId": "61",
    "type": "reads",
    "properties": {}
  },
  {
    "id": "48",
    "startNodeId": "30",
    "endNodeId": "61",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "214",
    "startNodeId": "137",
    "endNodeId": "62",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "227",
    "startNodeId": "145",
    "endNodeId": "62",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "236",
    "startNodeId": "148",
    "endNodeId": "63",
    "type": "readsFrom",
    "properties": {}
  },
  {
    "id": "84",
    "startNodeId": "42",
    "endNodeId": "64",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "156",
    "startNodeId": "121",
    "endNodeId": "64",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "157",
    "startNodeId": "121",
    "endNodeId": "65",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "85",
    "startNodeId": "42",
    "endNodeId": "65",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "158",
    "startNodeId": "121",
    "endNodeId": "66",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "86",
    "startNodeId": "42",
    "endNodeId": "66",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "254",
    "startNodeId": "153",
    "endNodeId": "66",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "87",
    "startNodeId": "42",
    "endNodeId": "67",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "255",
    "startNodeId": "153",
    "endNodeId": "67",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "260",
    "startNodeId": "154",
    "endNodeId": "68",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "88",
    "startNodeId": "42",
    "endNodeId": "68",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "89",
    "startNodeId": "42",
    "endNodeId": "69",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "90",
    "startNodeId": "42",
    "endNodeId": "70",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "129",
    "startNodeId": "110",
    "endNodeId": "71",
    "type": "readFrom",
    "properties": {
      "file": "messages.cmd,messages.auc"
    }
  },
  {
    "id": "91",
    "startNodeId": "42",
    "endNodeId": "71",
    "type": "creates",
    "properties": {}
  },
  {
    "id": "219",
    "startNodeId": "141",
    "endNodeId": "71",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "111",
    "startNodeId": "106",
    "endNodeId": "71",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "256",
    "startNodeId": "153",
    "endNodeId": "73",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "116",
    "startNodeId": "107",
    "endNodeId": "74",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "249",
    "startNodeId": "152",
    "endNodeId": "75",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "43",
    "startNodeId": "29",
    "endNodeId": "76",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "257",
    "startNodeId": "153",
    "endNodeId": "77",
    "type": "upload",
    "properties": {}
  },
  {
    "id": "263",
    "startNodeId": "155",
    "endNodeId": "78",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "233",
    "startNodeId": "147",
    "endNodeId": "78",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "262",
    "startNodeId": "155",
    "endNodeId": "79",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "99",
    "startNodeId": "96",
    "endNodeId": "80",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "97",
    "startNodeId": "82",
    "endNodeId": "80",
    "type": "saves",
    "properties": {
      "note": "Difference environments write to different prefixes"
    }
  },
  {
    "id": "98",
    "startNodeId": "86",
    "endNodeId": "81",
    "type": "subscribe",
    "properties": {}
  },
  {
    "id": "197",
    "startNodeId": "131",
    "endNodeId": "81",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "199",
    "startNodeId": "131",
    "endNodeId": "82",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "186",
    "startNodeId": "130",
    "endNodeId": "83",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "130",
    "startNodeId": "110",
    "endNodeId": "84",
    "type": "producedBy",
    "properties": {}
  },
  {
    "id": "149",
    "startNodeId": "119",
    "endNodeId": "84",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "198",
    "startNodeId": "131",
    "endNodeId": "85",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "162",
    "startNodeId": "122",
    "endNodeId": "86",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "268",
    "startNodeId": "155",
    "endNodeId": "87",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "269",
    "startNodeId": "155",
    "endNodeId": "88",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "270",
    "startNodeId": "155",
    "endNodeId": "89",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "271",
    "startNodeId": "155",
    "endNodeId": "90",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "272",
    "startNodeId": "155",
    "endNodeId": "91",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "273",
    "startNodeId": "155",
    "endNodeId": "92",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "274",
    "startNodeId": "155",
    "endNodeId": "93",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "275",
    "startNodeId": "155",
    "endNodeId": "94",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "234",
    "startNodeId": "147",
    "endNodeId": "95",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "57",
    "startNodeId": "32",
    "endNodeId": "95",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "75",
    "startNodeId": "38",
    "endNodeId": "95",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "125",
    "startNodeId": "109",
    "endNodeId": "97",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "294",
    "startNodeId": "159",
    "endNodeId": "98",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "79",
    "startNodeId": "38",
    "endNodeId": "98",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "264",
    "startNodeId": "155",
    "endNodeId": "98",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "301",
    "startNodeId": "160",
    "endNodeId": "98",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "179",
    "startNodeId": "125",
    "endNodeId": "98",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "152",
    "startNodeId": "119",
    "endNodeId": "98",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "228",
    "startNodeId": "145",
    "endNodeId": "98",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "155",
    "startNodeId": "120",
    "endNodeId": "99",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "107",
    "startNodeId": "103",
    "endNodeId": "100",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "229",
    "startNodeId": "145",
    "endNodeId": "101",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "180",
    "startNodeId": "125",
    "endNodeId": "101",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "295",
    "startNodeId": "159",
    "endNodeId": "102",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "315",
    "startNodeId": "162",
    "endNodeId": "103",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "365",
    "startNodeId": "171",
    "endNodeId": "103",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "178",
    "startNodeId": "125",
    "endNodeId": "104",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "68",
    "startNodeId": "36",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "95",
    "startNodeId": "43",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "160",
    "startNodeId": "121",
    "endNodeId": "105",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "117",
    "startNodeId": "108",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "253",
    "startNodeId": "153",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "337",
    "startNodeId": "168",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "314",
    "startNodeId": "162",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "121",
    "startNodeId": "109",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "174",
    "startNodeId": "124",
    "endNodeId": "105",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "371",
    "startNodeId": "172",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "363",
    "startNodeId": "171",
    "endNodeId": "105",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "78",
    "startNodeId": "38",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "140",
    "startNodeId": "114",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "282",
    "startNodeId": "158",
    "endNodeId": "107",
    "type": "uses",
    "properties": {
      "applications": "realtime"
    }
  },
  {
    "id": "32",
    "startNodeId": "26",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "291",
    "startNodeId": "159",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "42",
    "startNodeId": "29",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "304",
    "startNodeId": "161",
    "endNodeId": "107",
    "type": "uses",
    "properties": {
      "applications": "realtime"
    }
  },
  {
    "id": "55",
    "startNodeId": "32",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "26",
    "startNodeId": "25",
    "endNodeId": "107",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "336",
    "startNodeId": "168",
    "endNodeId": "108",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "31",
    "startNodeId": "26",
    "endNodeId": "108",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "30",
    "startNodeId": "26",
    "endNodeId": "109",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "105",
    "startNodeId": "103",
    "endNodeId": "111",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "242",
    "startNodeId": "150",
    "endNodeId": "111",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "303",
    "startNodeId": "161",
    "endNodeId": "111",
    "type": "uses",
    "properties": {
      "applications": "activation,updater"
    }
  },
  {
    "id": "252",
    "startNodeId": "153",
    "endNodeId": "111",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "281",
    "startNodeId": "158",
    "endNodeId": "111",
    "type": "uses",
    "properties": {
      "applications": "activation,updater"
    }
  },
  {
    "id": "25",
    "startNodeId": "25",
    "endNodeId": "111",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "240",
    "startNodeId": "150",
    "endNodeId": "112",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "132",
    "startNodeId": "111",
    "endNodeId": "112",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "241",
    "startNodeId": "150",
    "endNodeId": "113",
    "type": "consumesFrom",
    "properties": {}
  },
  {
    "id": "133",
    "startNodeId": "111",
    "endNodeId": "113",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "35",
    "startNodeId": "27",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "286",
    "startNodeId": "158",
    "endNodeId": "115",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "53",
    "startNodeId": "32",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "292",
    "startNodeId": "159",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "364",
    "startNodeId": "171",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "299",
    "startNodeId": "160",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "80",
    "startNodeId": "38",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "184",
    "startNodeId": "128",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "306",
    "startNodeId": "161",
    "endNodeId": "115",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "29",
    "startNodeId": "26",
    "endNodeId": "115",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "146",
    "startNodeId": "115",
    "endNodeId": "116",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "142",
    "startNodeId": "115",
    "endNodeId": "117",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "313",
    "startNodeId": "162",
    "endNodeId": "118",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "351",
    "startNodeId": "170",
    "endNodeId": "118",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "385",
    "startNodeId": "175",
    "endNodeId": "118",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "360",
    "startNodeId": "171",
    "endNodeId": "118",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "339",
    "startNodeId": "168",
    "endNodeId": "118",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "103",
    "startNodeId": "103",
    "endNodeId": "118",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "372",
    "startNodeId": "172",
    "endNodeId": "118",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "192",
    "startNodeId": "130",
    "endNodeId": "123",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "128",
    "startNodeId": "110",
    "endNodeId": "123",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "60",
    "startNodeId": "33",
    "endNodeId": "125",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "175",
    "startNodeId": "125",
    "endNodeId": "126",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "176",
    "startNodeId": "125",
    "endNodeId": "127",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "63",
    "startNodeId": "35",
    "endNodeId": "128",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "181",
    "startNodeId": "128",
    "endNodeId": "129",
    "type": "caches",
    "properties": {}
  },
  {
    "id": "283",
    "startNodeId": "158",
    "endNodeId": "131",
    "type": "postTo",
    "properties": {
      "applications": "diagnostic"
    }
  },
  {
    "id": "66",
    "startNodeId": "36",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "159",
    "startNodeId": "121",
    "endNodeId": "131",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "46",
    "startNodeId": "30",
    "endNodeId": "131",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "143",
    "startNodeId": "115",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "118",
    "startNodeId": "108",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "305",
    "startNodeId": "161",
    "endNodeId": "131",
    "type": "postTo",
    "properties": {
      "applications": "diagnostic"
    }
  },
  {
    "id": "72",
    "startNodeId": "37",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "77",
    "startNodeId": "38",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "39",
    "startNodeId": "28",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "41",
    "startNodeId": "29",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "300",
    "startNodeId": "160",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "168",
    "startNodeId": "122",
    "endNodeId": "131",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "293",
    "startNodeId": "159",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "122",
    "startNodeId": "109",
    "endNodeId": "131",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "135",
    "startNodeId": "111",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "172",
    "startNodeId": "123",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "251",
    "startNodeId": "153",
    "endNodeId": "132",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "204",
    "startNodeId": "133",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "208",
    "startNodeId": "134",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "188",
    "startNodeId": "130",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "145",
    "startNodeId": "115",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "110",
    "startNodeId": "105",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "338",
    "startNodeId": "168",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "164",
    "startNodeId": "122",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "124",
    "startNodeId": "109",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "232",
    "startNodeId": "147",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "244",
    "startNodeId": "150",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "126",
    "startNodeId": "110",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "120",
    "startNodeId": "108",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "239",
    "startNodeId": "149",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "216",
    "startNodeId": "137",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "20",
    "startNodeId": "19",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "13",
    "startNodeId": "16",
    "endNodeId": "132",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "287",
    "startNodeId": "158",
    "endNodeId": "133",
    "type": "uses",
    "properties": {
      "applications": "settings"
    }
  },
  {
    "id": "52",
    "startNodeId": "32",
    "endNodeId": "133",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "307",
    "startNodeId": "161",
    "endNodeId": "133",
    "type": "uses",
    "properties": {
      "applications": "settings"
    }
  },
  {
    "id": "113",
    "startNodeId": "106",
    "endNodeId": "133",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "166",
    "startNodeId": "122",
    "endNodeId": "134",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "194",
    "startNodeId": "130",
    "endNodeId": "134",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "310",
    "startNodeId": "161",
    "endNodeId": "134",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "335",
    "startNodeId": "168",
    "endNodeId": "134",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "206",
    "startNodeId": "83",
    "endNodeId": "134",
    "type": "producedBy",
    "properties": {}
  },
  {
    "id": "387",
    "startNodeId": "175",
    "endNodeId": "134",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "69",
    "startNodeId": "36",
    "endNodeId": "135",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "62",
    "startNodeId": "33",
    "endNodeId": "135",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "56",
    "startNodeId": "32",
    "endNodeId": "135",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "73",
    "startNodeId": "37",
    "endNodeId": "135",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "212",
    "startNodeId": "135",
    "endNodeId": "136",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "285",
    "startNodeId": "158",
    "endNodeId": "137",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "67",
    "startNodeId": "36",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "112",
    "startNodeId": "106",
    "endNodeId": "137",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "267",
    "startNodeId": "155",
    "endNodeId": "137",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "153",
    "startNodeId": "120",
    "endNodeId": "137",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "51",
    "startNodeId": "32",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "165",
    "startNodeId": "122",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "223",
    "startNodeId": "142",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "259",
    "startNodeId": "154",
    "endNodeId": "137",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "34",
    "startNodeId": "27",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "185",
    "startNodeId": "128",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "40",
    "startNodeId": "29",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "28",
    "startNodeId": "26",
    "endNodeId": "137",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "298",
    "startNodeId": "160",
    "endNodeId": "138",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "290",
    "startNodeId": "159",
    "endNodeId": "138",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "81",
    "startNodeId": "38",
    "endNodeId": "138",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "177",
    "startNodeId": "125",
    "endNodeId": "139",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "279",
    "startNodeId": "157",
    "endNodeId": "139",
    "type": "postTo",
    "properties": {
      "note": "only some players"
    }
  },
  {
    "id": "218",
    "startNodeId": "139",
    "endNodeId": "140",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "217",
    "startNodeId": "138",
    "endNodeId": "141",
    "type": "readFrom",
    "properties": {}
  },
  {
    "id": "50",
    "startNodeId": "31",
    "endNodeId": "142",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "220",
    "startNodeId": "142",
    "endNodeId": "143",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "221",
    "startNodeId": "142",
    "endNodeId": "144",
    "type": "caches",
    "properties": {}
  },
  {
    "id": "61",
    "startNodeId": "33",
    "endNodeId": "145",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "248",
    "startNodeId": "152",
    "endNodeId": "145",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "226",
    "startNodeId": "145",
    "endNodeId": "146",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "289",
    "startNodeId": "159",
    "endNodeId": "147",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "76",
    "startNodeId": "38",
    "endNodeId": "147",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "284",
    "startNodeId": "158",
    "endNodeId": "147",
    "type": "uses",
    "properties": {
      "applications": "music"
    }
  },
  {
    "id": "36",
    "startNodeId": "27",
    "endNodeId": "147",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "224",
    "startNodeId": "142",
    "endNodeId": "147",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "266",
    "startNodeId": "155",
    "endNodeId": "147",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "379",
    "startNodeId": "174",
    "endNodeId": "148",
    "type": "readsFrom",
    "properties": {}
  },
  {
    "id": "361",
    "startNodeId": "171",
    "endNodeId": "149",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "189",
    "startNodeId": "130",
    "endNodeId": "149",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "386",
    "startNodeId": "175",
    "endNodeId": "149",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "398",
    "startNodeId": "182",
    "endNodeId": "149",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "333",
    "startNodeId": "168",
    "endNodeId": "149",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "167",
    "startNodeId": "122",
    "endNodeId": "149",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "45",
    "startNodeId": "30",
    "endNodeId": "151",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "104",
    "startNodeId": "103",
    "endNodeId": "151",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "71",
    "startNodeId": "37",
    "endNodeId": "151",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "65",
    "startNodeId": "36",
    "endNodeId": "151",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "38",
    "startNodeId": "28",
    "endNodeId": "151",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "297",
    "startNodeId": "160",
    "endNodeId": "152",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "141",
    "startNodeId": "114",
    "endNodeId": "152",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "106",
    "startNodeId": "103",
    "endNodeId": "156",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "250",
    "startNodeId": "153",
    "endNodeId": "156",
    "type": "postTo",
    "properties": {}
  },
  {
    "id": "296",
    "startNodeId": "160",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "207",
    "startNodeId": "134",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "173",
    "startNodeId": "124",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "302",
    "startNodeId": "161",
    "endNodeId": "156",
    "type": "uses",
    "properties": {
      "applications": "activation,diagnostic,music,realtime,settings,updater"
    }
  },
  {
    "id": "196",
    "startNodeId": "131",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "54",
    "startNodeId": "32",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "12",
    "startNodeId": "16",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "17",
    "startNodeId": "18",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "21",
    "startNodeId": "19",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "24",
    "startNodeId": "25",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "27",
    "startNodeId": "26",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "395",
    "startNodeId": "182",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "119",
    "startNodeId": "108",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "44",
    "startNodeId": "30",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "210",
    "startNodeId": "135",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "163",
    "startNodeId": "122",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "148",
    "startNodeId": "118",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "109",
    "startNodeId": "105",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "70",
    "startNodeId": "37",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "280",
    "startNodeId": "158",
    "endNodeId": "156",
    "type": "uses",
    "properties": {
      "applications": "activation,diagnostic,music,realtime,settings,updater"
    }
  },
  {
    "id": "171",
    "startNodeId": "123",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "134",
    "startNodeId": "111",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "362",
    "startNodeId": "171",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "127",
    "startNodeId": "110",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "123",
    "startNodeId": "109",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "114",
    "startNodeId": "106",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "288",
    "startNodeId": "159",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "332",
    "startNodeId": "168",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "215",
    "startNodeId": "137",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "154",
    "startNodeId": "120",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "33",
    "startNodeId": "27",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "74",
    "startNodeId": "38",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "238",
    "startNodeId": "149",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "187",
    "startNodeId": "130",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "115",
    "startNodeId": "107",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "389",
    "startNodeId": "175",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "139",
    "startNodeId": "114",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "231",
    "startNodeId": "147",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "64",
    "startNodeId": "36",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "243",
    "startNodeId": "150",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "318",
    "startNodeId": "166",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "265",
    "startNodeId": "155",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "183",
    "startNodeId": "128",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "222",
    "startNodeId": "142",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "37",
    "startNodeId": "28",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "203",
    "startNodeId": "133",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "59",
    "startNodeId": "33",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "258",
    "startNodeId": "154",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "377",
    "startNodeId": "173",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "144",
    "startNodeId": "115",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "247",
    "startNodeId": "152",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "246",
    "startNodeId": "151",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "201",
    "startNodeId": "132",
    "endNodeId": "156",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "317",
    "startNodeId": "166",
    "endNodeId": "163",
    "type": "uses",
    "properties": {
      "data": "PN player creds"
    }
  },
  {
    "id": "331",
    "startNodeId": "168",
    "endNodeId": "163",
    "type": "uses",
    "properties": {
      "data": "PN player creds"
    }
  },
  {
    "id": "376",
    "startNodeId": "173",
    "endNodeId": "163",
    "type": "saves",
    "properties": {
      "data": "PN player creds"
    }
  },
  {
    "id": "357",
    "startNodeId": "171",
    "endNodeId": "163",
    "type": "uses",
    "properties": {
      "data": "mobile player creds"
    }
  },
  {
    "id": "388",
    "startNodeId": "175",
    "endNodeId": "163",
    "type": "saves",
    "properties": {
      "data": "PN player creds"
    }
  },
  {
    "id": "311",
    "startNodeId": "162",
    "endNodeId": "164",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "353",
    "startNodeId": "170",
    "endNodeId": "164",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "325",
    "startNodeId": "167",
    "endNodeId": "165",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "370",
    "startNodeId": "172",
    "endNodeId": "167",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "369",
    "startNodeId": "172",
    "endNodeId": "169",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "381",
    "startNodeId": "174",
    "endNodeId": "172",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "394",
    "startNodeId": "175",
    "endNodeId": "172",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "328",
    "startNodeId": "167",
    "endNodeId": "172",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "368",
    "startNodeId": "171",
    "endNodeId": "172",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "348",
    "startNodeId": "169",
    "endNodeId": "172",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "356",
    "startNodeId": "170",
    "endNodeId": "172",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "358",
    "startNodeId": "171",
    "endNodeId": "173",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "355",
    "startNodeId": "170",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator"
    }
  },
  {
    "id": "347",
    "startNodeId": "169",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator"
    }
  },
  {
    "id": "375",
    "startNodeId": "173",
    "endNodeId": "176",
    "type": "postTo",
    "properties": {
      "userpools": "curator,mobile"
    }
  },
  {
    "id": "327",
    "startNodeId": "167",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator"
    }
  },
  {
    "id": "367",
    "startNodeId": "170",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator"
    }
  },
  {
    "id": "374",
    "startNodeId": "172",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator"
    }
  },
  {
    "id": "341",
    "startNodeId": "168",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "mobile"
    }
  },
  {
    "id": "393",
    "startNodeId": "175",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator"
    }
  },
  {
    "id": "323",
    "startNodeId": "166",
    "endNodeId": "176",
    "type": "uses",
    "properties": {
      "userpools": "curator,mobile"
    }
  },
  {
    "id": "23",
    "startNodeId": "24",
    "endNodeId": "176",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "321",
    "startNodeId": "166",
    "endNodeId": "177",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "345",
    "startNodeId": "169",
    "endNodeId": "178",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "312",
    "startNodeId": "162",
    "endNodeId": "179",
    "type": "sends",
    "properties": {}
  },
  {
    "id": "342",
    "startNodeId": "169",
    "endNodeId": "180",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "391",
    "startNodeId": "175",
    "endNodeId": "180",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "397",
    "startNodeId": "182",
    "endNodeId": "180",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "401",
    "startNodeId": "183",
    "endNodeId": "181",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "22",
    "startNodeId": "21",
    "endNodeId": "184",
    "type": "saves",
    "properties": {}
  },
  {
    "id": "190",
    "startNodeId": "130",
    "endNodeId": "185",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "807",
    "startNodeId": "186",
    "endNodeId": "185",
    "type": "USES",
    "properties": {}
  },
  {
    "id": "383",
    "startNodeId": "175",
    "endNodeId": "185",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "343",
    "startNodeId": "169",
    "endNodeId": "185",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "329",
    "startNodeId": "168",
    "endNodeId": "185",
    "type": "uses",
    "properties": {}
  },
  {
    "id": "805",
    "startNodeId": "186",
    "endNodeId": "374",
    "type": "SAVES",
    "properties": {}
  },
  {
    "id": "809",
    "startNodeId": "186",
    "endNodeId": "377",
    "type": "POSTS",
    "properties": {}
  }
];
