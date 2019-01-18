import { isHoverEnabled } from "./HoverState";
import { element, func, oneOfType } from "prop-types";
import React, { Component } from "react";

interface Props {
    onHoverIn?: () => void,
    onHoverOut?: () => void,
}

interface State {
    isHovered: boolean,
    showHover: boolean,
}

export default class Hoverable extends Component<Props, State> {
    propTypes = {
        children: oneOfType([func, element]),
        onHoverIn: func,
        onHoverOut: func
    }

    displayName = "Hoverable"

    constructor(props: Props) {
        super(props);
        this.state = { isHovered: false, showHover: true };
        this._handleMouseEnter = this._handleMouseEnter.bind(this);
        this._handleMouseLeave = this._handleMouseLeave.bind(this);
        this._handleGrant = this._handleGrant.bind(this);
        this._handleRelease = this._handleRelease.bind(this);
    }

    _handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
        if (isHoverEnabled() && !this.state.isHovered) {
            const { onHoverIn } = this.props;
            if (onHoverIn) onHoverIn();
            this.setState(state => ({ ...state, isHovered: true }));
        }
    }

    _handleMouseLeave(e: React.MouseEvent<HTMLElement>) {
        if (this.state.isHovered) {
            const { onHoverOut } = this.props;
            if (onHoverOut) onHoverOut();
            this.setState(state => ({ ...state, isHovered: false }));
        }
    }

    _handleGrant() {
        this.setState(state => ({ ...state, showHover: false }));
    }

    _handleRelease() {
        this.setState(state => ({ ...state, showHover: true }));
    }

    render() {
        const { children } = this.props;
        const child =
            typeof children === "function"
                ? children(this.state.showHover && this.state.isHovered)
                : children;

        return React.cloneElement(React.Children.only(child), {
            onMouseEnter: this._handleMouseEnter,
            onMouseLeave: this._handleMouseLeave,
            // prevent hover showing while responder
            onResponderGrant: this._handleGrant,
            onResponderRelease: this._handleRelease,
            // if child is Touchable
            onPressIn: this._handleGrant,
            onPressOut: this._handleRelease
        });
    }
}
