type FileCardProps = {
    filename: string;
    timeAgo: string;
    category: "Main" | "Assets" | "UI" | "Config";
    iconName: string;
    colorClass: "vn-pink" | "vn-blue" | "vn-green" | "primary";
};

export function FileCard({ filename, timeAgo, category, iconName, colorClass }: FileCardProps) {
    const colorStyles = {
        "vn-pink": "bg-vn-pink/20 text-vn-pink border-vn-pink/50",
        "vn-blue": "bg-vn-blue/20 text-vn-blue border-vn-blue/50",
        "vn-green": "bg-vn-green/20 text-vn-green border-vn-green/50",
        "primary": "bg-primary/20 text-primary border-primary/50",
    };

    const badgeStyles = {
        "vn-pink": "bg-vn-pink/10 text-vn-pink",
        "vn-blue": "bg-vn-blue/10 text-vn-blue",
        "vn-green": "bg-vn-green/10 text-vn-green",
        "primary": "bg-primary/10 text-primary",
    };

    return (
        <div className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all hover:border-${colorClass}/50 cursor-pointer`}>
            <div className={`w-10 h-10 ${colorStyles[colorClass].split(' ')[0]} ${colorStyles[colorClass].split(' ')[1]} rounded-lg flex items-center justify-center mb-3`}>
                <span className="material-symbols-outlined">{iconName}</span>
            </div>
            <p className="text-sm font-bold truncate">{filename}</p>
            <p className="text-[10px] text-slate-500 mb-3">{timeAgo}</p>
            <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full ${badgeStyles[colorClass]} text-[10px] font-bold`}>
                    {category}
                </span>
                <button className="text-slate-400 p-1 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined text-sm">more_vert</span>
                </button>
            </div>
        </div>
    );
}
