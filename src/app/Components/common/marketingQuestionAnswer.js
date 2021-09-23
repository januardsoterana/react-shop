import React, {useState, useEffect} from 'react'

import { Title, Description, Container } from './cards/base'

import './questionanswer.css'
import {doQuery} from "../../../state/utils/contentful";

export default ({ component }) => {
    const [card, setCard] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

	const queryQL = `{
        marketingQuestionAnswer(id: "${component.sys.id}") {
            question
            answer {
              json
            }
        }
    }`

	useEffect(() => {
        doQuery(queryQL)
            .then(data => {
                setCard(data.marketingQuestionAnswer)
            })
    }, [])
    
	if (!card) {
		return null
    }

    const toggleOpen = () => {
        if (!isOpen) {
            return setIsOpen(true)
        }

        return setIsOpen(false)
    }

	return (
        <Container card={card} format="question_answer">
            <Title card={{ title: card.question }} format="question_answer" onClick={toggleOpen} />
            { isOpen && 
                <Description card={{ description: card.answer }} format="question_answer" />
            }
        </Container>
    )
}