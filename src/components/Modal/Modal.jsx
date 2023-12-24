import { Component } from 'react'

import css from './Modal.module.css'

export class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown', this.props.close)       
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.props.close)
    }

    render(){
    return (
        <>
            <div className={css.Overlay}
                onClick={this.props.close}>
            <div className={ css.Modal}>
            <img src={this.props.src } alt="" />
            </div>
            </div>
        </>
        )
        }
}