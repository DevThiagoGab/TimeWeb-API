const handleUpload = async (req, res) => {
    try {
        const filePath = req.file.path; // Caminho salvo do arquivo
        // Aqui você poderia salvar `filePath` no banco, se necessário

        res.status(201).json({ message: 'Upload realizado com sucesso', path: filePath });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer upload', details: error.message });
    }
};

module.exports = { handleUpload };