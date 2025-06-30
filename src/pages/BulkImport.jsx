import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import SafeIcon from '../common/SafeIcon';
import ImageUpload from '../components/ImageUpload';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiDownload, FiCheck, FiX, FiAlertTriangle, FiFileText } = FiIcons;

function BulkImport() {
  const [csvData, setCsvData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);
  const [imageUploads, setImageUploads] = useState({});

  const expectedColumns = [
    'name',
    'category',
    'description',
    'image',
    'bronze_price',
    'silver_price',
    'gold_price',
    'platinum_price',
    'min_order',
    'in_stock',
    'ingredients',
    'certifications'
  ];

  const sampleData = [
    {
      name: 'Gentle Honey Cleanser',
      category: 'cleansers',
      description: 'Natural honey-based cleanser with chamomile extract',
      image: 'https://images.unsplash.com/photo-1556228578-dd302b8a5e60?w=400',
      bronze_price: 12.50,
      silver_price: 11.75,
      gold_price: 11.00,
      platinum_price: 10.25,
      min_order: 12,
      in_stock: 245,
      ingredients: 'Honey,Chamomile,Aloe Vera',
      certifications: 'Organic,Cruelty-Free'
    },
    {
      name: 'Vitamin C Brightening Serum',
      category: 'serums',
      description: 'Potent vitamin C serum with hyaluronic acid',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      bronze_price: 28.00,
      silver_price: 26.25,
      gold_price: 24.50,
      platinum_price: 22.75,
      min_order: 6,
      in_stock: 89,
      ingredients: 'Vitamin C,Hyaluronic Acid,Niacinamide',
      certifications: 'Vegan,Cruelty-Free'
    }
  ];

  const downloadTemplate = () => {
    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'product_import_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateData = (data) => {
    const validationErrors = [];

    data.forEach((row, index) => {
      const rowErrors = [];

      // Check required fields
      if (!row.name) rowErrors.push('Name is required');
      if (!row.category) rowErrors.push('Category is required');
      if (!row.description) rowErrors.push('Description is required');

      // Check pricing
      ['bronze_price', 'silver_price', 'gold_price', 'platinum_price'].forEach(field => {
        if (!row[field] || isNaN(parseFloat(row[field]))) {
          rowErrors.push(`${field.replace('_', ' ')} must be a valid number`);
        }
      });

      // Check quantities
      if (!row.min_order || isNaN(parseInt(row.min_order))) {
        rowErrors.push('Min order must be a valid number');
      }

      if (!row.in_stock || isNaN(parseInt(row.in_stock))) {
        rowErrors.push('In stock must be a valid number');
      }

      if (rowErrors.length > 0) {
        validationErrors.push({
          row: index + 1,
          errors: rowErrors
        });
      }
    });

    return validationErrors;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data.filter(row =>
            Object.values(row).some(value => value && value.toString().trim() !== '')
          );
          setCsvData(data);
          const validationErrors = validateData(data);
          setErrors(validationErrors);
          setImportComplete(false);

          // Initialize image uploads object
          const uploads = {};
          data.forEach((row, index) => {
            uploads[index] = row.image || '';
          });
          setImageUploads(uploads);
        },
        header: true,
        skipEmptyLines: true
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const handleImport = async () => {
    if (errors.length > 0) return;

    setImporting(true);

    // Update CSV data with uploaded images
    const updatedData = csvData.map((row, index) => ({
      ...row,
      image: imageUploads[index] || row.image
    }));

    // Simulate import process
    setTimeout(() => {
      setImporting(false);
      setImportComplete(true);
      // Here you would typically send the data to your backend
      console.log('Importing products:', updatedData);
    }, 2000);
  };

  const clearData = () => {
    setCsvData([]);
    setErrors([]);
    setImportComplete(false);
    setImageUploads({});
  };

  const handleImageUpload = (index, imageUrl) => {
    setImageUploads(prev => ({
      ...prev,
      [index]: imageUrl
    }));
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">Bulk Product Import</h1>
          <p className="text-earth-600 mt-2">
            Import multiple products at once using CSV files
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-forest-50 border border-forest-200 rounded-xl p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-forest-900 mb-4">Import Instructions</h2>
          <div className="space-y-2 text-forest-800">
            <p>1. Download the CSV template to see the required format</p>
            <p>2. Fill in your product data following the template structure</p>
            <p>3. Upload your completed CSV file using the dropzone below</p>
            <p>4. Upload individual product images for each row (optional)</p>
            <p>5. Review the preview and fix any validation errors</p>
            <p>6. Click "Import Products" to add them to your catalog</p>
          </div>
          <button
            onClick={downloadTemplate}
            className="mt-4 bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
          >
            <SafeIcon icon={FiDownload} />
            <span>Download CSV Template</span>
          </button>
        </motion.div>

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-forest-500 bg-forest-50'
                : 'border-earth-300 hover:border-forest-400 hover:bg-earth-50'
            }`}
          >
            <input {...getInputProps()} />
            <SafeIcon icon={FiUpload} className="text-4xl text-earth-400 mb-4 mx-auto" />
            {isDragActive ? (
              <p className="text-lg text-forest-600">Drop the CSV file here...</p>
            ) : (
              <>
                <p className="text-lg text-earth-600 mb-2">
                  Drag and drop your CSV file here, or click to select
                </p>
                <p className="text-sm text-earth-500">Only CSV files are accepted</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-terracotta-50 border border-terracotta-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center mb-4">
              <SafeIcon icon={FiAlertTriangle} className="text-terracotta-600 mr-2" />
              <h3 className="text-lg font-semibold text-terracotta-900">
                Validation Errors ({errors.length} rows)
              </h3>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {errors.map((error, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-terracotta-200">
                  <p className="font-medium text-terracotta-900 mb-2">Row {error.row}:</p>
                  <ul className="list-disc list-inside text-terracotta-700 text-sm space-y-1">
                    {error.errors.map((err, errIndex) => (
                      <li key={errIndex}>{err}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Data Preview with Image Uploads */}
        {csvData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-earth-900">
                Data Preview ({csvData.length} products)
              </h2>
              <div className="flex space-x-2">
                {errors.length === 0 && !importComplete && (
                  <button
                    onClick={handleImport}
                    disabled={importing}
                    className="bg-forest-600 hover:bg-forest-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={importing ? FiUpload : FiCheck} />
                    <span>{importing ? 'Importing...' : 'Import Products'}</span>
                  </button>
                )}
                <button
                  onClick={clearData}
                  className="border border-earth-300 hover:bg-earth-50 text-earth-700 px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Clear Data
                </button>
              </div>
            </div>

            {importComplete && (
              <div className="bg-forest-50 border border-forest-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="text-forest-600 mr-2" />
                  <p className="text-forest-800 font-medium">
                    Successfully imported {csvData.length} products!
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {csvData.slice(0, 10).map((product, index) => (
                <div key={index} className="border border-earth-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-earth-900 mb-2">{product.name}</h3>
                      <p className="text-earth-600 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-earth-500">
                        <span className="capitalize">{product.category}</span>
                        <span>•</span>
                        <span>Bronze: ${parseFloat(product.bronze_price || 0).toFixed(2)}</span>
                        <span>•</span>
                        <span>Gold: ${parseFloat(product.gold_price || 0).toFixed(2)}</span>
                        <span>•</span>
                        <span>Min: {product.min_order}</span>
                        <span>•</span>
                        <span>Stock: {product.in_stock}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-2">
                        Product Image
                      </label>
                      <ImageUpload
                        value={imageUploads[index] || product.image}
                        onChange={(imageUrl) => handleImageUpload(index, imageUrl)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {csvData.length > 10 && (
              <div className="px-4 py-3 bg-earth-50 text-sm text-earth-500 text-center mt-6 rounded-lg">
                Showing first 10 of {csvData.length} products
              </div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {csvData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-12"
          >
            <SafeIcon icon={FiFileText} className="text-earth-400 text-4xl mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-earth-900 mb-2">No data uploaded</h3>
            <p className="text-earth-600 mb-4">
              Upload a CSV file to see a preview of your products here
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BulkImport;