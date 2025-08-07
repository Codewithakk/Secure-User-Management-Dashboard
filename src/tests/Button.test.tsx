import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '@/components/common/Button'

describe('Button', () => {
    it('renders with primary variant by default', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })

        expect(button).toHaveClass('bg-blue-600')
        expect(button).toHaveTextContent('Click me')
    })

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Cancel</Button>)
        const button = screen.getByRole('button', { name: /cancel/i })

        expect(button).toHaveClass('bg-gray-200')
    })

    it('shows loading state', () => {
        render(<Button loading>Submit</Button>)
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
        expect(button).toHaveTextContent('Loading...')
        expect(button.querySelector('svg')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<Button className="custom-class">Test</Button>)
        const button = screen.getByRole('button', { name: /test/i })

        expect(button).toHaveClass('custom-class')
    })
})