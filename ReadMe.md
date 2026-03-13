### [Visit my web site](https://bsenichak.vercel.app/)

<img align="center" src="https://github-readme-activity-graph.vercel.app/graph?username=BSenichak&theme=react-dark"/>

## I can do something like this
```typescript
import { ListItemButton, ListItemIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"
import React, { useCallback } from "react";
import type { Theme } from "@mui/material/styles";


export interface LinkProps {
    link: string;
    title: string;
    icon?: React.ReactNode
}
/**
 * Navigation button component for the header
 * 
 * Renders a clickable list item button that navigates to a specified route.
 * The button's background color changes based on whether the current location
 * matches the link's destination (active state).
 * 
 * @param {LinkProps} props - The component props
 * @param {string} props.link - The route path to navigate to
 * @param {string} props.title - The display text for the button
 * @param {ReactElement} props.icon - Icon right on the right (not required)
 * 
 * @returns {JSX.Element} A styled ListItemButton with navigation functionality
 * 
 * @example
 * ```tsx
 * <Link link="/dashboard" title="Dashboard" />
 * ```
 */
export default function Link({ link, title, icon }: LinkProps) {
    let navigate = useNavigate()
    let location = useLocation()

    let goTo = useCallback(() => {
        navigate(link)
    }, [])
    let setButtonColor = (theme: Theme) => ({ backgroundColor: location.pathname == link ? theme.palette.primary.dark : theme.palette.primary.main })

    return (
        <ListItemButton onClick={goTo} sx={(theme) => ({ ...setButtonColor(theme), flexGrow: 0 })}>
            {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
            {title}
        </ListItemButton>
    )
}
```
# Loock more on my project [ToDo on Steroids](https://github.com/BSenichak/Nest_react_mysql)

