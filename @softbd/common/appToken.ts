const token = {
  coreApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsIm5iZiI6MTYzMDQ5MDEzNywiYXpwIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9idXMuc29mdGJkLnh5ejo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MzA0OTM3MzcsImlhdCI6MTYzMDQ5MDEzNywianRpIjoiMjg0MmM3YTgtN2Q0Zi00NDE2LThmMzEtMjk2MzQ0NGUxZDNiIn0.vKL-q_VFZe74OBiCjv7Wdd6PYGgClpm_GPNTCQR3XsPGa-2soaglgQOHQFgulQNqihL3DZyM35d-x9FmHeWPCgKIjXYmHe8FYb9G51x8OH3sUBglIgL1QwEFPA25T2Bo-usuhjsRhjbsQhOluYGDqaB24X6nFev8tisgLRn7PnOWgBePCdHc5fZ555DtZAeG-1HnjYE-VAz0DkV90aaesFJ4xs8tZqr2DKodA_tbc8FXFWQ2j-CTsBAE9tKCkfW-QZgSvGFk2wfwS_PGHwjZfsw_b7wcRk87Pu3KRyhfgKGAuESmVeUJMZYFQrKTxCFDf7QMbIxCSJfnZqOVyMOLoA',
  instituteApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsIm5iZiI6MTYzMDQ5MjY1OSwiYXpwIjoiSm54WkM2ZG9aYmFxNTRtVjMzdFAyaFp3MTBrYSIsInNjb3BlIjoiZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9idXMuc29mdGJkLnh5ejo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MzA0OTYyNTksImlhdCI6MTYzMDQ5MjY1OSwianRpIjoiNzY5YTA4NmMtNmI0OC00ZjdlLTgyMjgtNGJhZmFkOWYxNjQ2In0.XqH_GUCojxA7QA2hc87snJOqmDRuCW0i4mpytgCO64N7H6stNRsM4bKp3-hwEDV1Bx1SQwcrwjcbTfpN6wobq5jN2fOqJ2YKCQElk-dc1RW-sVF075BPEh0lI71nZxGqLEKcIbmj4eQliaAHtVr_zZZHYz2p9255pvzV3CG_vNkcpNWgwJPZSGO0NNLnksDVG5IJ9R5sJULqB82sf3szTgKrl3HYYqxM6Q6kW3_1LhqE3Dm2ou1oK_HZY29xkUxaruwvulSiodjCcHXlHlRnrxQAxcAJ_hUNnNIvlw0yIrJce_Mb1R_wsjtjyUKMbInjZLHOuLZSoTQBOSkzYi-TOw',
  orgApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJuYmYiOjE2MzA0OTc2ODYsImF6cCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjMwOTk3Njg2LCJpYXQiOjE2MzA0OTc2ODYsImp0aSI6IjM0ZmQwNmYwLTA2NzAtNGQ0My05ZjI1LTY3ODM3ODc5ZjE5NiJ9.k5VIWQ_AcZL-FRyEfwQTR2M78VtnrfT1_GA1CkAUFAC9TYrLOTg5JFfFtS0xMmdkMkscLVmNAWFBhNd9hTV0GwCPpwSq9q5yMpdfnDwzUN4IQ7e1sV97OaheCUqs4dKLmPkPfYb229vS81uEZqBbqmKkUeiJt9DjA9kc9xBny1M4mewE_4bk5T1FPVIwjNpbJ3beZAyT6UcIsMpJ3XjapaX3_TGyw4eLWYKnc6MBtlH0SL3r1z7IAd-2lie1rjwXtld0AFZgHTXYcwFLVLjBC8d2zGoBFmd1xoO0Kf7zIgSmilxC1hJis4ifJdzPD3VAY9HAzJPTsQKXxvkqhKe_sA',
};

export default token;
