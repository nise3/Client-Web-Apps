const token = {
  coreApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImhYWXhHRVZPaWlOMk5WTmpmZE5aazF1cjJtRWEiLCJuYmYiOjE2Mjk5NTgyNjAsImF6cCI6ImhYWXhHRVZPaWlOMk5WTmpmZE5aazF1cjJtRWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI5OTYxODYwLCJpYXQiOjE2Mjk5NTgyNjAsImp0aSI6IjZhOTY5NWY3LWE2MzMtNGY5NC1iNTFiLTFhYmM4MzM5NWZiMCJ9.InJ99EPV0ISSbapj75fPlLsz-nopOSQEPuZp3As0sv_gZcy5at2hM3DKzYH2WX25kzYKzgKkJbVFL41QvgNqvq2B0lcRNG3Kq72lB5_UzF-rDnpVfvAYGxM3kENitGcHfJAwxb-tAbkaZP56FAGq8n9F7Oc-4lC5S_r1iDAO-RLbOEjpFelF2ejXSTnRCqGvS-Cqu5Q4FaTH8coZhSxZxa5PPDP1LeO95Aw9gE3eCCBcsG4dpLgWNbzAR81c8YRC002lRGFdzGKekthPYV0RahfIkB_AAYfjtylI_hb6M5Kws1uOnxEOaqYk13098kYjXgaWNG-B8rPLQb3L0cazyA',
  instituteApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImhYWXhHRVZPaWlOMk5WTmpmZE5aazF1cjJtRWEiLCJuYmYiOjE2Mjk5NTgyMzUsImF6cCI6ImhYWXhHRVZPaWlOMk5WTmpmZE5aazF1cjJtRWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI5OTYxODM1LCJpYXQiOjE2Mjk5NTgyMzUsImp0aSI6IjI5Y2YxM2U0LTgwZGMtNGVlOC04ODQ2LTYxOWU4MjcxYmUxOCJ9.gjUAyuZoiVPOEkn7xIkl8CUFH9-gic-pJ-tinyjTTypbMmu1K7umiX_-ZEygXRXDZSxQ3aI3SZFY5ZAnAbf_zG5hmaSA0EYf8-zuZQBZ502i5k3evKFSASixSerYcCP0Zw6hR4z3loCLDwzfdVjnClzUS802dLxkoe4x1qE8mpqD-xsaDYFi05AXY7DvajkIqEXCCovXELuiUEdFIYB5d-zpMkfSUw9RRifhi-5nCmYVHBjKMmcHDOkwekI32Vo_H4fIZPoRupFBLU3w9kLGrJH_Cz-ZUcTHl5EbLEevx3_zTOAGUYmlQ5KgPa2djW0DzjNea8vbo4p73q8SXJHDjw',
  orgApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImhYWXhHRVZPaWlOMk5WTmpmZE5aazF1cjJtRWEiLCJuYmYiOjE2Mjk5NjIwMDMsImF6cCI6ImhYWXhHRVZPaWlOMk5WTmpmZE5aazF1cjJtRWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjI5OTY1NjAzLCJpYXQiOjE2Mjk5NjIwMDMsImp0aSI6ImVhZjIwMjYxLTc3NDYtNDhmMC05M2Q3LTY2OWRlMDE4MmY4MCJ9.MdTpd0U0iuiith4silcZjr0kFvGCu1YL3js8QIvsQ4PELLIbWJ1TsDC-KLqFbI8R9sInZXzwbzsf9oesPQUX5-FBF8GLO8wjTDhHCMtqvlCo7_uEVDqZ8yCpJ9zmtykXhnSvWw3O9pE0RJqsEiL1eq4KvteKYml2kl77koN0y6CGYsFJ95CgpRUsivmJN5hYebP-kGWGmW8Nnon3RUTQqOjPYkC7zotaWF9DDgBhcKJpPBaTz8lDZ6EdMkx_C_9O9QRucsXun5KflK9laEXrqNfcTfx58sbaurBf56Ki8lGpTPILP6IDWprjRTJ7BOHOExzPEaOOYdRavET_J_pdjg',
};

export default token;
