import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  isArabic
}) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [activeTab, setActiveTab] = useState<'compression' | 'oversized' | 'bottoms' | 'shorts'>('compression');

  if (!isOpen) return null;

  const compressionData = [
    { size: 'S', chest: '88-94 cm', waist: '74-80 cm', height: '165-172 cm', weight: '60-70 kg' },
    { size: 'M', chest: '95-101 cm', waist: '81-87 cm', height: '173-179 cm', weight: '71-80 kg' },
    { size: 'L', chest: '102-108 cm', waist: '88-94 cm', height: '180-186 cm', weight: '81-90 kg' },
    { size: 'XL', chest: '109-116 cm', waist: '95-102 cm', height: '185-192 cm', weight: '91-100 kg' },
    { size: 'XXL', chest: '117-124 cm', waist: '103-110 cm', height: '188-196 cm', weight: '101-112 kg' },
    { size: '3XL', chest: '125-132 cm', waist: '111-118 cm', height: '190-200 cm', weight: '113-125 kg' }
  ];

  const oversizedData = [
    { size: 'S', chest: '108 cm', length: '72 cm', shoulder: '52 cm', fit: 'Boxy Relaxed' },
    { size: 'M', chest: '114 cm', length: '74 cm', shoulder: '54 cm', fit: 'True Oversized' },
    { size: 'L', chest: '120 cm', length: '76 cm', shoulder: '56 cm', fit: 'True Oversized' },
    { size: 'XL', chest: '126 cm', length: '78 cm', shoulder: '58 cm', fit: 'Heavy Slouch' },
    { size: 'XXL', chest: '132 cm', length: '80 cm', shoulder: '60 cm', fit: 'Ultra Slouch' },
    { size: '3XL', chest: '138 cm', length: '82 cm', shoulder: '62 cm', fit: 'Max Baggy' }
  ];

  const sweatpantsData = [
    { size: 'S', waist: '72-78 cm', length: '102 cm', hip: '104 cm', inseam: '76 cm' },
    { size: 'M', waist: '78-84 cm', length: '104 cm', hip: '110 cm', inseam: '78 cm' },
    { size: 'L', waist: '84-90 cm', length: '106 cm', hip: '116 cm', inseam: '80 cm' },
    { size: 'XL', waist: '90-96 cm', length: '108 cm', hip: '122 cm', inseam: '82 cm' },
    { size: 'XXL', waist: '96-102 cm', length: '110 cm', hip: '128 cm', inseam: '84 cm' },
    { size: '3XL', waist: '102-110 cm', length: '112 cm', hip: '134 cm', inseam: '85 cm' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-black text-white">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-neutral-300" />
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider font-heading">
              {isArabic ? 'دليل المقاسات الرسمية سوترة' : 'SOTRA Official Sizing Chart'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Tab Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar border-b border-neutral-200 pb-2">
            <button
              onClick={() => setActiveTab('compression')}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === 'compression'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Compression Tees
            </button>
            <button
              onClick={() => setActiveTab('oversized')}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === 'oversized'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Oversized Tees &amp; Hoodies
            </button>
            <button
              onClick={() => setActiveTab('bottoms')}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === 'bottoms'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Sweatpants &amp; Shorts
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {activeTab === 'compression' && (
              <table className="w-full text-left text-xs border border-neutral-200">
                <thead className="bg-neutral-100 uppercase font-black text-neutral-900">
                  <tr>
                    <th className="p-2.5 border-b">Size</th>
                    <th className="p-2.5 border-b">Chest</th>
                    <th className="p-2.5 border-b">Waist</th>
                    <th className="p-2.5 border-b">Height</th>
                    <th className="p-2.5 border-b">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {compressionData.map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-50">
                      <td className="p-2.5 font-bold text-black">{row.size}</td>
                      <td className="p-2.5">{row.chest}</td>
                      <td className="p-2.5">{row.waist}</td>
                      <td className="p-2.5">{row.height}</td>
                      <td className="p-2.5">{row.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'oversized' && (
              <table className="w-full text-left text-xs border border-neutral-200">
                <thead className="bg-neutral-100 uppercase font-black text-neutral-900">
                  <tr>
                    <th className="p-2.5 border-b">Size</th>
                    <th className="p-2.5 border-b">Chest Width</th>
                    <th className="p-2.5 border-b">Body Length</th>
                    <th className="p-2.5 border-b">Shoulder Drop</th>
                    <th className="p-2.5 border-b">Silhouette</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {oversizedData.map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-50">
                      <td className="p-2.5 font-bold text-black">{row.size}</td>
                      <td className="p-2.5">{row.chest}</td>
                      <td className="p-2.5">{row.length}</td>
                      <td className="p-2.5">{row.shoulder}</td>
                      <td className="p-2.5">{row.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'bottoms' && (
              <table className="w-full text-left text-xs border border-neutral-200">
                <thead className="bg-neutral-100 uppercase font-black text-neutral-900">
                  <tr>
                    <th className="p-2.5 border-b">Size</th>
                    <th className="p-2.5 border-b">Waist (Elastic)</th>
                    <th className="p-2.5 border-b">Total Length</th>
                    <th className="p-2.5 border-b">Hip Width</th>
                    <th className="p-2.5 border-b">Inseam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {sweatpantsData.map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-50">
                      <td className="p-2.5 font-bold text-black">{row.size}</td>
                      <td className="p-2.5">{row.waist}</td>
                      <td className="p-2.5">{row.length}</td>
                      <td className="p-2.5">{row.hip}</td>
                      <td className="p-2.5">{row.inseam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Sizing Fit Advisory */}
          <div className="bg-neutral-50 p-3.5 border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
            <h4 className="font-bold text-black uppercase">Fit Recommendation:</h4>
            <p>• <strong>Compression Tees:</strong> Stick to your standard size for muscle contouring. If you prefer a less tight fit, size up.</p>
            <p>• <strong>Oversized Apparel:</strong> Cut intentionally oversized with dropped shoulders. Order your regular size for the intended streetwear baggy look.</p>
            <p>• <strong>Need exchange?</strong> We offer 100% free size exchanges across Egypt within 14 days of delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
