import { ButtonProps } from "types/widgets/button"

export default ({
    child,
    ...rest
}: ButtonProps) => Widget.Button({
    child: Widget.Box({ child }),
    classNames: ['panel-button', 'flat'],
    ...rest,
})
