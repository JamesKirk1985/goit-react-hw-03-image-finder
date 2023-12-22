import css from './Button.module.css'
export const Button = ({ loadMoreFunc }) => {
    return (
        <button
            type="button"
            className={css.Button}
            onClick={loadMoreFunc}>
            Load more
        </button>
    )
}