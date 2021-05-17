import { Typography } from './Typography';

export default {
    title: 'Example/Typography',
    component: Typography,
};

const Template = (args) => <Typography {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    del:true
};