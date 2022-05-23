### First install wamp server in your windows machine. and enable following modules for apache:

```bash
mod_lbmethod_byrequests
mod_proxy_connect
mod_proxy_http
mod_proxy
mod_headers
mod_env
mod_deflate
mod_ssl
```
### After that add the following entries in your windows host file:
```bash
127.0.0.1	nise.asm
::1	nise.asm

127.0.0.1	admin.nise.asm
::1	admin.nise.asm

127.0.0.1	youth.nise.asm
::1	youth.nise.asm

127.0.0.1	dyd.nise.asm
::1	dyd.nise.asm

127.0.0.1	bitac.nise.asm
::1	bitac.nise.asm

127.0.0.1	smef.nise.asm
::1	smef.nise.asm

127.0.0.1	nascib.nise.asm
::1	nascib.nise.asm

127.0.0.1	mcci.nise.asm
::1	mcci.nise.asm

127.0.0.1	rpl.nise.asm
::1	rpl.nise.asm

127.0.0.1	migration-portal.nise.asm
::1	migration-portal.nise.asm
```

### After that add the following entries in your apache virtual host file:
```bash
<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName admin.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3000/
	ProxyPassReverse / http://localhost:3000/

	Header set Access-Control-Allow-Origin "*"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3001/
	ProxyPassReverse / http://localhost:3001/

	Header set Access-Control-Allow-Origin "*"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName youth.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3002/
	ProxyPassReverse / http://localhost:3002/

	Header set Access-Control-Allow-Origin "*"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName dyd.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3003/
	ProxyPassReverse / http://localhost:3003/

	Header set Access-Control-Allow-Origin "*"
	#Header set Set-Cookie "institute_id=26;domain=.nise.asm; path=/;"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName bitac.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3003/
	ProxyPassReverse / http://localhost:3003/

	Header set Access-Control-Allow-Origin "*"
	#Header set Set-Cookie "institute_id=27;domain=.nise.asm; path=/;"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName smef.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3004/
	ProxyPassReverse / http://localhost:3004/

	Header set Access-Control-Allow-Origin "*"
	#Header set Set-Cookie "institute_id=27;domain=.nise.asm; path=/;"

</VirtualHost>
<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName mcci.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3004/
	ProxyPassReverse / http://localhost:3004/

	Header set Access-Control-Allow-Origin "*"
	#Header set Set-Cookie "institute_id=27;domain=.nise.asm; path=/;"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName rpl.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3005/
	ProxyPassReverse / http://localhost:3005/

	Header set Access-Control-Allow-Origin "*"

</VirtualHost>

<VirtualHost *:80>
	ServerAdmin nise@mydomain.com
	ServerName migration-portal.nise.asm

	UseCanonicalName on
	ProxyPreserveHost On
	ProxyRequests Off

	<Proxy *>
		Order allow,deny
		Allow from all
	</Proxy>

	ProxyPass / http://localhost:3006/
	ProxyPassReverse / http://localhost:3006/

	Header set Access-Control-Allow-Origin "*"

</VirtualHost>
```
