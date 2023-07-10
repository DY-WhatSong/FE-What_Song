import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/button/Button';
import EmojiBar from '../../components/bar/EmojiBar';

const meta: Meta<typeof Button> = {
	title: 'nav/Emoji',
	component: EmojiBar,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		content: '다음',
	},
};
