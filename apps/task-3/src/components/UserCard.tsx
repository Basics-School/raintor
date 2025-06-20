import { User } from "../store/userStore";

interface UserCardProps {
    user: User;
    style?: React.CSSProperties;
}

export const UserCard = ({ user, style }: UserCardProps) => {
    return (
        <div
            style={style}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                    </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-medium text-lg">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-2">📞</span>
                    {user.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-2">🌐</span>
                    <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {user.website}
                    </a>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Company
                </h4>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.company.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                        "{user.company.catchPhrase}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        {user.company.bs}
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Address
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.address.suite} {user.address.street}<br />
                    {user.address.city}, {user.address.zipcode}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    📍 {user.address.geo.lat}, {user.address.geo.lng}
                </p>
            </div>
        </div>
    );
};
