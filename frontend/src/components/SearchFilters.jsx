import { Search, Filter } from 'lucide-react';

const SearchFilters = ({ searchTerm, onSearchChange, filterType, onFilterChange }) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-6">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher par expéditeur ou objet..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
        >
          <option value="">Tous les emails</option>
          <option value="unread">Non lus seulement</option>
          <option value="today">Aujourd'hui</option>
        </select>
      </div>
    </div>
  </div>
);

export default SearchFilters;