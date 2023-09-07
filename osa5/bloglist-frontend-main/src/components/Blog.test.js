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
    let mocksetBlogs = jest.fn()
    let mockRemoveBlog = jest.fn()
    let mockBlogs = jest.fn()
test('renders title and author', () => {


    const { container } = render(<Blog blog={blog} user={user} blogs={mockBlogs} setBlogs={mocksetBlogs} removeBlog={mockRemoveBlog}/>)

    const div = container.querySelector('.blogTitleAndAuthor')
    expect(div).toHaveTextContent(
        'Otsikko Katri'
    )
})

test('clicking the button to show more', async () => {

    const { container } = render(<Blog blog={blog} user={user} blogs={mockBlogs} setBlogs={mocksetBlogs} removeBlog={mockRemoveBlog}/>)

    const button = screen.getByText('Otsikko Katri')
    await userEvent.setup().click(button)
    
    const div = container.querySelector('.otherInfo')
    expect(div).toHaveTextContent('Otsikko Katri hidelol.filikes: 5 likeadded by Roseremove')
})
})