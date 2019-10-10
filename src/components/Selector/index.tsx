import * as React from 'react';
import './index.scss';

export interface ISelectorOption {
    name: string;
    value: string;
}

interface ISelectorProps {
    onSelect: (option: string) => void;
    options: ISelectorOption[];
    value?: string;
}

export class Selector extends React.Component<ISelectorProps> {
    public render() {
        return (
            <select
                value={this.getDefaultValue()}
                className={'form-control'}
                onChange={(e: any) => this.props.onSelect(this.props.options[e.currentTarget.selectedIndex].value)}
            >
                {this.props.options.map((option, i) => <option key={i} value={option.value}>{option.name}</option>)}
            </select>
        );
    }
    private getDefaultValue() {
        if (this.props.value) {
            return this.props.value;
        }
        if (this.props.options.length) {
            return this.props.options[0].value;
        }
        return '';
    }
}