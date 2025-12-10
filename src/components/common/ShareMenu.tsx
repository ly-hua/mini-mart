import React, { useState } from 'react';
import { Share2, X } from 'lucide-react';

interface ShareMenuProps {
    productName: string;
    productPrice: number;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ productName, productPrice }) => {
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl = window.location.href;
    const shareText = `Check out ${productName} for only $${productPrice.toFixed(2)}!`;

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        instagram: shareUrl,
        tiktok: shareUrl,
    };

    const handleShare = (platform: string) => {
        if (platform === 'instagram' || platform === 'tiktok') {
            navigator.clipboard.writeText(shareUrl);
            alert(`Link copied! You can now paste it in ${platform === 'instagram' ? 'Instagram' : 'TikTok'}`);
        } else {
            window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
        }
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 md:h-14 md:w-14 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Share"
            >
                <Share2 size={20} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl border border-gray-200 p-4 z-50 min-w-[200px]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-sm text-gray-900">Share</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => handleShare('facebook')}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-left"
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                            </button>

                            <button
                                onClick={() => handleShare('telegram')}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-left"
                            >
                                <div className="w-8 h-8 bg-[#0088cc] rounded-full flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.093.036.306.02.472z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Telegram</span>
                            </button>

                            <button
                                onClick={() => handleShare('instagram')}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors text-left"
                            >
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Instagram</span>
                            </button>

                            <button
                                onClick={() => handleShare('tiktok')}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">TikTok</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShareMenu;
