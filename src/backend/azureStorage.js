const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');

// Initialize BlobServiceClient with the connection string from environment variables
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

// Use a default container name if none is provided in environment variables
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'uploads';

// Get a reference to the container client
const containerClient = blobServiceClient.getContainerClient(containerName);

// Function to upload a file buffer to Azure Blob Storage
const uploadFileToAzure = async (buffer, fileName) => {
    try {
        // Generate a unique blob name using UUID
        const blobName = `${uuidv1()}-${fileName}`;

        // Get a block blob client to interact with the blob (file)
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload the buffer to the blob in Azure Storage
        await blockBlobClient.upload(buffer, buffer.length);

        // Return the URL of the uploaded blob
        return blockBlobClient.url;
    } catch (error) {
        console.error('Error uploading file to Azure Blob Storage:', error);
        throw new Error('File upload to Azure Blob Storage failed.');
    }
};

module.exports = { uploadFileToAzure };
