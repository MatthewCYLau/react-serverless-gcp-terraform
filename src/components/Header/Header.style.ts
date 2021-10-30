import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => createStyles({
    title: {
        marginRight: spacing(3)
    }
}),
{ name: 'Header' });
