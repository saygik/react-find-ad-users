import React, {useState, useEffect} from 'react'
import validate from 'validate.js'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import constraints from '../../assets/constraints';
import {useData} from '../../context/Data'
import {Box, Chip, makeStyles} from "@material-ui/core"
import CreatableSelect from 'react-select/creatable';
import Grow from '@material-ui/core/Grow';
const useStyles = makeStyles(
    theme => ({
        root:{
            '& .MuiPaper-root': {
                minHeight: '23vw'
            }
        },
        title: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.light,
            '& h2': {
                fontSize:'1.5rem',
                letterSpacing: '0.1em',
                fontWeight: '600'
            }
        },
        message: {
            '& .MuiInputBase-root': {
                fontSize:'1.5rem',
                letterSpacing: '0.05em',
            },
            padding:'10px',
            lineHeight: '1.3',
        },
        selector:{
            marginBottom: 30
        }
    }),
    { name: 'NewTemplateDialog' }
);


const ACTION_SEND = 'ACTION_SEND';

const initialState = {
    performingAction: false,
    templateName: '',
    message: '',
    templateCategorie: null,
    categoryOptions:[],
    id: null,
    errors: null,
    action: null
};

const customStyles = {
    control: () => ({
        padding: 10
    }),
}

const NewTemplateDialog = (props) => {

    const {
        dialogProps,
        handleMessageChange,
        handleNameChange,
        handleCategoryChange,
        isEdit,
        onClose,
        send
    }= props
    const {
        performingAction,
        message,
        templateName,
        templateCategorie,
        categoryOptions,
        errors
    } = props.state;
    const classes = useStyles();

    return (
        <Dialog fullWidth maxWidth="md" {...dialogProps}  TransitionComponent={Grow} transitionDuration={500} className={classes.root}>
            <DialogTitle className={classes.title}>
                {isEdit
                    ? 'Изменить шаблон сообщения'
                    : 'Новый шаблон сообщения'
                }
            </DialogTitle>

            <DialogContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <Grid container justify="flex-end">
                            <Grid item xs={5}>
                            <CreatableSelect
                                isClearable
                                onChange={handleCategoryChange}
                                options={categoryOptions}
                                value={templateCategorie}
                                className={classes.selector}
                                styles={customStyles}
                            />
                            </Grid>
                        </Grid>

                        <TextField
                            autoFocus
                            className={classes.message}
                            disabled={performingAction}
                            error={!!(errors && errors.name)}
                            fullWidth
                            helperText={(errors && errors.name) ? errors.name[0] : ''}
                            label='наименование'
                            placeholder="наименование"
                            required
                            value={templateName}
                            onChange={handleNameChange}
                        />
                        <TextField
                            className={classes.message}
                            disabled={performingAction}
                            error={!!(errors && errors.message)}
                            fullWidth
                            helperText={(errors && errors.message) ? errors.message[0] : ''}
                            label='сообщение'
                            placeholder="(:сообщение:)"
                            required
                            value={message}
                            // variant="outlined"
                            onChange={handleMessageChange}
                        />

                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Отменить
                </Button>

                <Button
                    color="primary"
                    disabled={!message  || performingAction}
                    variant="contained"
                    onClick={send}>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const NewTemplateDialogContainer = () => {
    const {
        selectors: {templateDialogOpen, selectedTemplate, messageTemplateCategories},
        mutations: { messageTemplates:{create:createTemplate, update: updateTemplate}},
        actions: {templateDialogClose}}= useData()

    const [state, setState]=useState(initialState)
    const [options, setOptions]=useState([])

    useEffect(()=> {
            setOptions(messageTemplateCategories.map(item => {
                return {value: item.text, label: item.text}
            }))
        }
        ,[messageTemplateCategories])

    const send = () => {
        const { message, templateName } = state;
        const errors = validate({
            message: message,
            templateName: templateName,
        }, {
            message: constraints.message,
            templateName: constraints.templateName,
        });

        if (errors) {
            setState({
                ...state,
                errors: errors
            });
        } else {
            setState({
                ...state,
                performingAction: true,
                errors: null,
                action: ACTION_SEND
            })
        }
    };
    const handleExited = () => {
        setState(initialState);
    };
    const handleKeyPress = (event) => {
        const { message, templateName } = state;
        if (!message || !templateName) {
            return;
        }
        const key = event.key;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
        if (key === 'Enter') {
            send();
        }
    };
    const handleMessageChange = (event) => {
        const message = event.target.value;
        setState({
            ...state,
            message: message,
        });
    };
    const handleNameChange  = (event) => {
        const templateName = event.target.value;
        setState({
            ...state,
            templateName: templateName
        });
    };
    const handleCategoryChange  = (newValue) => {
        setState({
            ...state,
            templateCategorie: newValue
        });
    };
    useEffect(()=> {
        if (!templateDialogOpen) {
            setState(initialState)

        } else {
            const selectedCategory={value: selectedTemplate.category, label: selectedTemplate.category}
            setState({...initialState,
                message: selectedTemplate.text || '',
                categoryOptions: options,
                templateCategorie: selectedCategory,
                templateName:selectedTemplate.name || '', id:selectedTemplate.id || null})
        }
    },[templateDialogOpen])
    useEffect(()=> {
        if (state.action === ACTION_SEND) {
            const category=state.templateCategorie && state.templateCategorie.label || ''
            if (state.id) updateTemplate.mutate({id: state.id, name: state.templateName, text: state.message, category: category})
            else createTemplate.mutate({name:state.templateName, text: state.message, category: category})
            setState({
                ...state,
                performingAction: false,
                action: null
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.action])
    const dialogProps= {
        open: templateDialogOpen,
        onClose: templateDialogClose,
        onExited: handleExited,
        onKeyPress: handleKeyPress
    }

    return <>
        <NewTemplateDialog
            state={state}
            dialogProps={dialogProps}
            onClose={templateDialogClose}
            handleMessageChange={handleMessageChange}
            handleNameChange={handleNameChange}
            handleCategoryChange={handleCategoryChange}
            isEdit={!!selectedTemplate.id}
            send={send}
        />
    </>
}
export default NewTemplateDialogContainer
