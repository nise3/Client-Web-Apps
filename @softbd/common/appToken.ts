const token = {
  coreApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJuYmYiOjE2MzA0NzkxNDcsImF6cCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjMwNDgyNzQ3LCJpYXQiOjE2MzA0NzkxNDcsImp0aSI6IjdiYzUwZDA1LTEyZTUtNGJmOS1hM2ZmLTA5NGIxZTAyMDU3YSJ9.kuxJUvSFs-jKMgZccqRyd5HIlrePPpQ1LCWDBbmc5Ts5cdCBEbXxbbhNsuLJPeG9btQcPGUQp6SJrGMEqgo9_AdYIXGFikuTi69O-iJpjlaAcoNicI9QNls7XaWUy0v3avPkOVgADtP_tNvOR7AW6AuXZw1yHTI4Gp7d_82g33GBxZsLjWWZsAkOCOsLEoQGbvrymggIZmfoEhoqnlnsvQb7s1T1T7yFN6KpUUiS_OvlQGbCq6EisIvfQH74PuMf8knpYeu5bLbDyZGZfyqO4r9X0JOvaxdUj9DM2wB7QUyMLOBguoZKfFEbNNhTwJPNg6IikeNV6gZGXNui51N7yw',
  instituteApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJuYmYiOjE2MzA0NzkwNzUsImF6cCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjMwNDgyNjc1LCJpYXQiOjE2MzA0NzkwNzUsImp0aSI6ImZkN2NhNTJmLWNkYTItNDVhMi1hMDQ5LTI3ZGVkYmY1ZDNmMSJ9.LA2RSHHQ4wwyRtNsfh1nHe2uwoxGOXWxD2onOS4dOOLHVYbhW1PS6qgJZFEfv24Rlz3Qu0hZ8fnJc3I8jcQ1YlKGngZq90DhUGDJ2UpqkrvKhzyFu0agv6LbWMZJGbvvAWjh52pOBE9GwvcPtw-MHQY72APNbcQlOT_kvBaNjEvieFRArobZ6LPn0EXmAy2pM-kg4no2fF_Js95TrEAbHobEdZadD8uhjSqHQMSTakmsxGNwUZ9NhPe4o8F1ulp-BEhRVQrJh2edppUWAwHzvaQx8tdTbVQYT3UKuymF410IkZSMONVpTbM9lZ1iCQjAz_r8sIISTnO8VfJ0b10USg',
  orgApi:
    'eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZXZlbG9wZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJuYmYiOjE2MzA0NzkwMjQsImF6cCI6IkVMZTlLX1IxTGtQWWI0R2tYRmJscllsZnh1SWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYnVzLnNvZnRiZC54eXo6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjMwNDgyNjI0LCJpYXQiOjE2MzA0NzkwMjQsImp0aSI6ImQzZTQ4YzMzLTE2MGMtNGFlNC1iZGEyLWIyNTU3NDI4YmYwOSJ9.amL8XmT1PBeWb8Zjyqg7J6c-yMWAgTO8EtvWCGZuqTnIfPVeH2ztX5mvE9h5zQPJ4LZkZ0L4Hka4b7OPM5KkfgGN_aYaeqQazPxypLcVEuZA6mIRK_eLIv8ZQcbc4w9yO7u58oZEX_CTlqdLmMo1hjl41HDjmeOMj9VPhDDWCnH0eaUeCvz9fQ7vMAHs5GeXlZMh061Tz0c32szl1zfHr8J9LcKSzed8tmPj_tjTM_eEQ7ZA3Z7l2A3JKEb1vBQo8QP1QdwWY47wv7ELqXzd9I5tmYjwhKUBtHmbXouJmsfPWfy_JvrlW0G9Z1M5FBY651x9OIxeI0wvbMCNd1Zw7A',
};

export default token;
