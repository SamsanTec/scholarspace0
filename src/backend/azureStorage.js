// azureStorage.js
const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'uploads';
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadFileToAzure = async (buffer, fileName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(buffer, buffer.length);
    return blockBlobClient.url;
};

module.exports = { uploadFileToAzure };
