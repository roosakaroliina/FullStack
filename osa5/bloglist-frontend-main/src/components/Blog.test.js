import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('test for Blog', () => {
    const user = {
        name: 'Rose',
        username: 'Kuusiv'
    }
    const blog = {
        title: 'Otsikko',
        author: 'Katri',
        likes: 5,
        url: 'lol.fi',
        user: user
    }

    const mockHandler = jest.fn()
    test('renders title and author', () => {
        const { container } = render(<Blog blog={blog} user={user}/>)

        const div = container.querySelector('.blogTitleAndAuthor')
        expect(div).toHaveTextContent(
            'Otsikko Katri'
        )
    })

    test('clicking the button to show more', async () => {
        const { container } = render(<Blog blog={blog} user={user} onSubmit={mockHandler} />)

        const button = screen.getByText('view')
        await userEvent.setup().click(button)

        const div = container.querySelector('.otherInfo')
        expect(div).toHaveTextContent('Otsikko Katri hidelol.filikes: 5 likeadded by Roseremove')
    })

    test('if like button is clicked twice, it calls eventHandler twice', async () => {
        const { container } = render(<Blog blog={blog} user={user} increaseLike={mockHandler} />)

        const likeButton = screen.getByText('like')
        await userEvent.setup().click(likeButton)
        await userEvent.setup().click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })
})