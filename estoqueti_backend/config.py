import os
from imports import *

# Configurações da aplicação 
app_ip = "0.0.0.0"

# Configurações do Banco de Dados 
db_user = "root"
db_pass = "Leste@2024"
db_port = "3306"
db_ip = "10.1.254.74" 
db_name = "estoque"
db_maxConn = '100'
db_minConn = '1'

# Configurações do AD
ad_server = 'ldap://10.1.254.15:389'
ad_base_dn = 'DC=intranet,DC=leste'

# informações para conexão com o ldap
LDAP_HOST = 'ldap://10.1.254.15:389'
LDAP_BASE_DN = 'DC=intranet,DC=leste'
LDAP_USER_CN = 'sistemasti'
LDAP_USER_PASSWORD = 'Leste@2024DC'
