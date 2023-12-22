import css from './Modal.module.css'
export const Modal = ({src, close}) => {
    return (
        <>
            <div className={css.Overlay}
                onClick={close}
            >
                <div className={ css.Modal}>
                    <img src={src } alt="" />
        </div>
        </div>
        </>
    )
}