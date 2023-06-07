import React from 'react';
import {Meta, StoryFn, StoryObj} from '@storybook/react';
import {FilterButton} from "./FilterButton";
import {action} from "@storybook/addon-actions";

const meta: Meta<typeof FilterButton> = {
    component: FilterButton,
    title: 'TODOLISTS/FilterButton',
    argTypes: {
        callback: action('All Button is active'),
    }
};
export default meta;

type Story = StoryObj<typeof FilterButton>;

export const FilterButtonStory: StoryFn = (args) => {
    return (
        <div
            style={{display: "flex", justifyContent: 'flex-start'}}>
            <FilterButton name={'All'} color={'secondary'}
                          callback={args.callback}/>
            <FilterButton name={'Active'} color={'primary'}
                          callback={args.callback}/>
            <FilterButton name={'Completed'} color={'primary'}
                          callback={args.callback}/>
        </div>
    )
};

export const ActiveFilterButtonStory: StoryFn = (args) => {
    return (
        <div
            style={{display: "flex", justifyContent: 'flex-start'}}>
            <FilterButton name={'All'} color={'primary'}
                          callback={args.callback}/>
            <FilterButton name={'Active'} color={'secondary'}
                          callback={args.callback}/>
            <FilterButton name={'Completed'} color={'primary'}
                          callback={args.callback}/>
        </div>
    )
};

export const CompletedFilterButtonStory: StoryFn = (args) => {
    return (
        <div
            style={{display: "flex", justifyContent: 'flex-start'}}>
            <FilterButton name={'All'} color={'primary'}
                          callback={args.callback}/>
            <FilterButton name={'Active'} color={'primary'}
                          callback={args.callback}/>
            <FilterButton name={'Completed'} color={'secondary'}
                          callback={args.callback}/>
        </div>
    )
};


