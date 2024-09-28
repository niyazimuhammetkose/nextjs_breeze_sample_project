export const ReturnBasicSearchHint = ({ pageName }) => {
    const BasicSearchHint =
        pageName == 'UserList'
            ? 'Name,Email'
            : pageName == 'ProgrammerList'
              ? 'Name,Email,XX'
              : ''
    return BasicSearchHint
}
