import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface VideoFormData {
  video_id: number;
  title: string;
  description: string;
  url: string;
  likes: number;
  views: number;
  category_id: number;
}

interface AddVideoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (videoData: VideoFormData) => void;
  categories: { category_id: number; category_name: string }[];
  initialData?: VideoFormData | null; 
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxHeight: '100vh',
  overflowY: 'auto',
  maxWidth: 600,
  bgcolor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  video_id: Yup.number().required('Video ID is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
  likes: Yup.number().min(0).required('Likes is required'),
  views: Yup.number().min(0).required('Views is required'),
  category_id: Yup.number().required('Category is required'),
});

const AddVideoModal: React.FC<AddVideoModalProps> = ({
  open,
  onClose,
  onSubmit,
  categories,
  initialData,
}) => {
  const initialValues: VideoFormData = initialData || {
    video_id: 0,
    title: '',
    description: '',
    url: '',
    likes: 0,
    views: 0,
    category_id: 0,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" mb={2} textAlign="center" fontWeight={"bold"}>
          {initialData ? 'Edit Video' : 'Add New Video'}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            onClose();
            resetForm();
          }}
          enableReinitialize
        >
          {({ handleChange, values }) => (
            <Form>
              <TextField
                fullWidth
                label="Video ID"
                name="video_id"
                type="number"
                value={values.video_id}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage
                name="video_id"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                fullWidth
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage
                name="title"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={1}
                value={values.description}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage
                name="description"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                fullWidth
                label="Video URL"
                name="url"
                value={values.url}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage
                name="url"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                fullWidth
                label="Likes"
                name="likes"
                type="number"
                value={values.likes}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage
                name="likes"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                fullWidth
                label="Views"
                name="views"
                type="number"
                value={values.views}
                onChange={handleChange}
                margin="normal"
              />
              <ErrorMessage
                name="views"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                select
                fullWidth
                label="Category"
                name="category_id"
                value={values.category_id}
                onChange={handleChange}
                margin="normal"
              >
                {categories.map((category) => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </TextField>
              <ErrorMessage
                name="category_id"
                render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                <Button variant="outlined" onClick={onClose} color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  {initialData ? 'Update' : 'Submit'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddVideoModal;


