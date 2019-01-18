import React, { ComponentType } from "react";
import { Dimensions } from 'react-native';

interface WindowDims {
    width: number,
    height: number,
};

interface ArgProps {
    windowDims: WindowDims,
};

interface Props {
    render: ComponentType<ArgProps>,
};

interface State {
    windowDims?: WindowDims,
};

export default class DimensionsAware extends React.Component<Props, State> {
    componentDidMount() {
        Dimensions.addEventListener("change", this.dimensionChangeHandler);
    }
    componentWillMount() {
        Dimensions.removeEventListener("change", this.dimensionChangeHandler);
    }
    dimensionChangeHandler = (dims: { window: WindowDims }) => {
        const windowDims = dims.window;
        this.setState({ windowDims });
    }
    render() {
        const RenderProp = this.props.render;
        const windowDims = Dimensions.get('window');
        return <RenderProp windowDims={windowDims} />;
    }
}