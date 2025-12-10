import React from 'react';

interface CategoryTabsProps {
  links: string[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ links }) => (
  <nav className="bg-gray-50 border-t border-b border-gray-200 shadow-inner hidden sm:block">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start items-center space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide h-12">
      {links.map(link => (
        <a
          key={link}
          href={`/category/${link.toLowerCase().replace(/\s+/g, '-')}`}
          className="py-1 px-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:border-b-2 hover:border-green-700 transition duration-150"
        >
          {link}
        </a>
      ))}
    </div>
  </nav>
);

export default React.memo(CategoryTabs);