import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {FilterButton} from "./FilterButton";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/FilterButton',
    component: FilterButton,
    args: {
        name: "All",
        callback: action('All Button is active'),
        color: 'secondary'
    }
} as ComponentMeta<typeof FilterButton>;

const Template: ComponentStory<typeof FilterButton> = (args) => <div
    style={{display: "flex", justifyContent: 'flex-start'}}>
    <FilterButton name={'All'} color={'secondary'}
                  callback={args.callback}/>
    <FilterButton name={'Active'} color={'primary'}
                  callback={args.callback}/>
    <FilterButton name={'Completed'} color={'primary'}
                  callback={args.callback}/>
</div>;
export const AllFilterButtonStory = Template.bind({})
AllFilterButtonStory.args = {}


const Template2: ComponentStory<typeof FilterButton> = (args) => <div
    style={{display: "flex", justifyContent: 'flex-start'}}>
    <FilterButton name={'All'} color={'primary'}
                  callback={args.callback}/>
    <FilterButton name={'Active'} color={'secondary'}
                  callback={args.callback}/>
    <FilterButton name={'Completed'} color={'primary'}
                  callback={args.callback}/>
</div>;
export const ActiveFilterButtonStory = Template2.bind({})
ActiveFilterButtonStory.args = {}


const Template3: ComponentStory<typeof FilterButton> = (args) => <div
    style={{display: "flex", justifyContent: 'flex-start'}}>
    <FilterButton name={'All'} color={'primary'}
                  callback={args.callback}/>
    <FilterButton name={'Active'} color={'primary'}
                  callback={args.callback}/>
    <FilterButton name={'Completed'} color={'secondary'}
                  callback={args.callback}/>
</div>;
export const CompletedFilterButtonStory = Template3.bind({})
CompletedFilterButtonStory.args = {}


