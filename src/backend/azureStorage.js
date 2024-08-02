const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'uploads';
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadFileToAzure = async (buffer, fileName) => {
    const blobName = `${uuidv1()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, buffer.length);
    return blockBlobClient.url;
};

module.exports = { uploadFileToAzure };
