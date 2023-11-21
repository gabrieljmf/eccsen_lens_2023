import Error from '../../components/Dashboard/Modals/Error'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../UI/Button'
import { Form } from '../UI/Form'
import { Input } from '../UI/Input'
import { Modal } from '../UI/Modal'
import { Spinner } from '../UI/Spinner'
import { TextArea } from '../UI/TextArea'

// The following imports do not match the BCharity 2023 directory and are created and implemented for Lens V2 demonstration purposes only.
// import useLogHours from '../../lib/lens-protocol/useLogHours'
// import { getUser } from '../../lib/lens-protocol/useLogHours'
//import { useAppPersistStore } from '@/store/app'

/**
 * Properties of {@link LogHoursButton}
 */
export interface LogHoursButtonProps {
  /**
   * Default value passed to the log hours form
   */
  hoursDefault: string
  /**
   * ID of the publication the log hours request is made to
   */
  publicationId: string
  /**
   * ID of the organization the log hours request is made to
   */
  organizationId: string
}

export interface IVhrVerificationFormProps {
  orgId: string
  jobUrl: string
  hoursToVerify: string
  comments: string
  picture: string
}

/**
 * Component to display a button that opens a modal with a form to
 * make a request to log hours/VHR
 *
 * The component uses the {@link useLogHours} hook to handle  sending
 * the request to the opportunity post
 */
const LogHoursButton: FC<LogHoursButtonProps> = ({
  hoursDefault,
  publicationId,
  organizationId
}) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.shared.apply-button'
  })

  //TODO: Make this get an actual user from Lens via getUser function in useLogHours.ts
  const { currentUser } = {currentUser: null} //getUser()

  const [showModal, setShowModal] = useState<boolean>(false)
  // const { error, isLoading, logHours } = useLogHours({
  //   publicationId,
  //   organizationId
  // })
  const isLoading = false; //TODO: Remove this once isLoading is implemented on backend

  const form = useForm<IVhrVerificationFormProps>()

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = form

  const onCancel = () => {
    reset()
    setShowModal(false)
  }

  //TODO: Implement onSubmit
  // const onSubmit = async (formData: IVhrVerificationFormProps) => {
  //   await logHours(
  //     currentUser,
  //     formData.orgId,
  //     formData.jobUrl,
  //     formData.hoursToVerify,
  //     formData.comments,
  //     formData.picture,
  //     onCancel
  //   )
  // }

  return (
    //TODO: The Log VHR hours input fields needs to be tested and connected with the backend.
    //      These features are currently for frontend display only!
    //      The 'hours' and 'comments & proof links' fields likely worked with the backend at some point.
    //      Working backwards from those fields will give you an idea on how to implement the rest.
    //      See useLogHours.ts for more
    <div>
      <Modal title={t('create')} show={showModal} onClose={onCancel}>
        <div className="mx-12 mt-5">
          {!isLoading ? (
            <Form
              form={form}
              onSubmit={() => {return null}}
              //onSubmit={() => handleSubmit((data) => onSubmit(data))} //TODO: Implement onSubmit
              className="flex flex-col space-y-2"
            >
              <Input
                type="text"
                label={t('org-id')}
                value={organizationId}
                placeholder={organizationId}
                //error={!!errors.comments?.type}
                {...register('orgId', { required: false, maxLength: 1000 })}
              />
              <TextArea
                suppressHydrationWarning
                label={t('job-url')}
                placeholder={t('job-url-placeholder')}
                //error={!!errors.comments?.type}
                {...register('comments', { required: false, maxLength: 2048 })}
              />
              <Input
                label={t('num-hours')}
                type="number"
                placeholder="5.5"
                step="0.1"
                min="0.1"
                defaultValue={hoursDefault}
                //error={!!errors.hoursToVerify?.type}
                {...register('hoursToVerify', {
                  required: true,
                  pattern: {
                    value: /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,1}$/,
                    message: t('invalid-hours')
                  }
                })}
              />
              <TextArea
                suppressHydrationWarning
                label={t('comment')}
                placeholder={t('placeholder')}
                //error={!!errors.comments?.type}
                {...register('comments', { required: false, maxLength: 1000 })}
              />
              <Input
                label={t('picture-field')}
                type="file"
                name="myImage"
                onChange={(event) => {
                  //Do something with the image here, ie call {...register('picture', )} and upload to lens in useLogHours.ts
                  if (event.target.files != null) {
                    console.log(event.target.files[0])
                  }
                }}
              />
            </Form>
          ) : (
            <Spinner />
          )}

          {/* {error && (
            <Error
              message={`${t('error-occurred')}${error}${t('try-again')}`}
            />
          )} */}
        </div>
        <div className="py-4 custom-divider"></div>
        <div className="flex px-4 py-3 justify-between">
          <Button
            //onClick={handleSubmit((data) => onSubmit(data))}
            className={`${
              isLoading ? 'bg-gray-400 hover:bg-gray-400 !border-black' : ''
            } px-6 py-2 font-medium`}
            disabled={isLoading}
          >
            {t('submit')}
          </Button>
          <Button
            onClick={onCancel}
            variant="secondary"
            className="px-6 py-2 font-medium"
          >
            {t('cancel')}
          </Button>
        </div>
      </Modal>
      <Button
        onClick={() => {
          setShowModal(true)
        }}
      >
        {t('button-label')}
      </Button>
    </div>
  )
}

export default LogHoursButton
