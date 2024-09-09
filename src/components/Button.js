const Button = ({ type = 'submit', size = 'md', className, ...props }) => {
    const sizeClasses =
        size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-xs'

    return (
        <button
            type={type}
            className={`${className} ${sizeClasses} inline-flex items-center bg-gray-800 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
            {...props}
        />
    )
}

export default Button
