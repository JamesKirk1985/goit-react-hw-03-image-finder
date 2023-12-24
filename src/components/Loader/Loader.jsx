import { Watch } from 'react-loader-spinner'
import css from "./Loader.module.css"
export const Loader = ({ isLoading }) => {
    return (
        <Watch
            height="80"            
            width="80"            
            radius="48"            
            color="grey"            
            ariaLabel="watch-loading"            
            wrapperStyle={{
                position: "absolute",
                top: '50%',
                left: "50%",
                transform: "translate(-50%, -50%)"
                }}            
            wrapperClassName={css.loader}            
            visible={isLoading}
            
            
            
/>
    )
}
