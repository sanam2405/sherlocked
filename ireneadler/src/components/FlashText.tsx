import React, { useState, useEffect } from 'react'
import '../styles/FlashText.css' // Create a CSS file for styling

interface FlashTextProps {
	text: string
}

const flashInterval = 5000

const FlashText: React.FC<FlashTextProps> = ({ text }) => {
	const [isVisible, setIsVisible] = useState<boolean>(true)
	const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({})

	const randomPosition = (): React.CSSProperties => {
		const maxX: number = window.innerWidth - 200 // Adjust as needed for text width
		const maxY: number = window.innerHeight - 50 // Adjust as needed for text height
		const x: number = Math.floor(Math.random() * maxX)
		const y: number = Math.floor(Math.random() * maxY)
		return {
			left: x,
			top: y,
			fontSize: '80px',
			color: 'green',
			fontWeight: '700',
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setIsVisible(prevVisible => !prevVisible)
			setPositionStyle(randomPosition)
		}, flashInterval) // Change interval duration as needed (e.g., 1000ms = 1 second)

		return () => clearInterval(interval)
	}, [])

	return (
		<div
			className={`flash-text ${isVisible ? 'visible' : 'hidden'}`}
			style={positionStyle}
		>
			{text}
		</div>
	)
}

export default FlashText
