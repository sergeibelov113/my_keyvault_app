const express = require('express');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 3000;

const keyVaultName = process.env.KEY_VAULT_NAME;
const secretName = process.env.SECRET_NAME;
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

app.get('/api/getSecret', async (req, res) => {
  const credential = new DefaultAzureCredential();
  const secretClient = new SecretClient(keyVaultUrl, credential);

  try {
    const secret = await secretClient.getSecret(secretName);
    res.json({ secret: secret.value });
  } catch (error) {
    res.status(500).send('Error retrieving secret from Azure Key Vault');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

