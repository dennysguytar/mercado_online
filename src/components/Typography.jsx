import Typography from '@material-ui/core/Typography'
import { Box, styled } from '@mui/system'
import clsx from 'clsx'



const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
    textTransform: textTransformStyle || 'none',
    whiteSpace: ellipsis ? 'nowrap' : 'normal',
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
    // color: theme.palette.primary.contrastText,
}))

export const H6 = ({
    children,
    className,
    ellipsis,
    textTransform,
    ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || '']: true,
            })}
            component="h6"
            mb={0}
            mt={0}
            fontSize="13px"
            fontWeight="500"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    )
}

export const Small = ({
    children,
    className,
    ellipsis,
    textTransform,
    ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || '']: true,
            })}
            component="small"
            fontSize="12px"
            fontWeight="500"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    )
}


export default Typography