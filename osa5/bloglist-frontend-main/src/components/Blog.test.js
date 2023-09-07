import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
    const user = {
        name: 'Roosa Kuusivaara',
        username: 'Kuusiv'
      }
  const blog = {
    title: 'Otsikko',
    author: 'Katri Nieminen',
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Otsikko'
  )
})