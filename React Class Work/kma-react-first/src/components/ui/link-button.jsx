'use client'

import { chakra, useRecipe } from '@chakra-ui/react'
import { forwardRef } from 'react'

// Replace "a" with your framework's link component
const StyledLink = chakra('a')

export const LinkButton = forwardRef(function LinkButton(props, ref) {
  const recipe = useRecipe({ key: 'button', recipe: props.recipe })
  const [variantProps, restProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)
  return <StyledLink ref={ref} {...restProps} css={[styles, props.css]} />
})
