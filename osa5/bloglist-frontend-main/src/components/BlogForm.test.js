import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()
    const mockSetMessage = jest.fn()
    
    const {container} = render(<BlogForm createBlog={createBlog} setMessage={mockSetMessage} />)

    const input = container.querySelector('#title')
    const sendButton = screen.getByText('create')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})