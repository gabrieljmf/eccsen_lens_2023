// // import {
// //   MetadataAttributeInput,
// //   Profile,
// //   ProfileFragment,
// //   PublicationMainFocus,
// //   PublicationMetadataDisplayTypes,
// //   PublicationMetadataV2Input
// // } from '@lens-protocol/client'
// // import { useState } from 'react'
// // import { useTranslation } from 'react-i18next'
// // import { v4 } from 'uuid'

// // import { APP_NAME } from '@/constants'
// // import { LogVhrRequestMetadataRecord, PostTags } from '@/lib/metadata'

// // import getUserLocale from '../getUserLocale'
// // import { MetadataVersion } from '../types'
// // import checkAuth from './checkAuth'
// // import useCreateComment from './useCreateComment'

// export interface UseLogHoursParams {
//   /**
//    * The id of the publication that created the request
//    */
//   publicationId: string
//   /**
//    * The organization that published this opportunity
//    */
//   organizationId: string
// }

// export interface UseLogHoursReturn {
//   /**
//    * Whether or not the request to log hours is pending
//    */
//   isLoading: boolean
//   /**
//    * An error message if the log hours failed
//    */
//   error: string
//   /**
//    *
//    * @param profile The profile of the user trying to log hours
//    * @param hoursToVerify The number of hours to log
//    * @param organizationId Organization ID.
//    * @param jobUrl The external URL for the job opportunity
//    * @param picture An optional picture to upload as proof of work
//    * @param comments Any comments
//    * @param onSuccess Callback function to be trigged on succes
//    * @returns
//    */
//   logHours: (
//     //profile: ProfileFragment | null,
//     organizationId: string,
//     jobUrl: string,
//     hoursToVerify: string,
//     comments: string,
//     picture: string,
//     //onSuccess?: VoidFunction
//   ) => Object //=> Promise<void>
// }

// // /**
// //  * A react hook to handle making VHR log requests with a comment
// //  *
// //  * @param params The params for the requests
// //  * @returns
// //  * @example A log hours button
// //  * // Adapted from LogHoursButton.tsx
// //  * ```
// //  * const { error, isLoading, logHours } = useLogHours({
// //  *   publicationId,
// //  *   organizationId
// //  * })
// //  * // ...
// //  * const onSubmit = async (formData: IVhrVerificationFormProps) => {
// //  *   await logHours(
// //  *     currentUser,
// //  *     formData.hoursToVerify,
// //  *     formData.comments,
// //  *     onCancel
// //  *   )
// //  * }
// //  */
// // const useLogHours = (params: UseLogHoursParams): UseLogHoursReturn => {
// //   const { t: e } = useTranslation('common', {
// //     keyPrefix: 'errors'
// //   })

// //   const { createComment } = useCreateComment()

// //   const [error, setError] = useState<string>('')
// //   const [isLoading, setIsLoading] = useState<boolean>(false)

// //   //TODO: implement organizationId, jobUrl, picture fields.
// //   const logHours = async (
// //     profile: ProfileFragment | null,
// //     organizationId: string,
// //     jobUrl: string,
// //     hoursToVerify: string,
// //     picture: string,
// //     comments: string,
// //     onSuccess?: VoidFunction
// //   ) => {
// //     if (profile === null) {
// //       setError(e('profile-null'))
// //       return
// //     }

// //     setIsLoading(true)
// //     setError('')

// //     const data: LogVhrRequestMetadataRecord = {
// //       type: PostTags.VhrRequest.Opportunity,
// //       version: MetadataVersion.LogVhrRequestMetadataVersions['1.0.0'],
// //       hoursToVerify,
// //       comments
// //     }

// //     const attributes: MetadataAttributeInput[] = Object.entries(data).map(
// //       ([k, v]) => {
// //         return {
// //           traitType: k,
// //           value: v,
// //           displayType: PublicationMetadataDisplayTypes.String
// //         }
// //       }
// //     )

// //     const metadata: PublicationMetadataV2Input = {
// //       version: '2.0.0',
// //       metadata_id: v4(),
// //       content: `#${PostTags.VhrRequest.Opportunity} #${params.organizationId}`,
// //       locale: getUserLocale(),
// //       tags: [PostTags.VhrRequest.Opportunity, params.organizationId],
// //       mainContentFocus: PublicationMainFocus.TextOnly,
// //       name: `${PostTags.VhrRequest.Opportunity} by ${profile.handle} for publication ${params.publicationId}`,
// //       attributes,
// //       appId: APP_NAME
// //     }

// //     try {
// //       await checkAuth(profile.ownedBy)

// //       await createComment({
// //         profileId: profile.id,
// //         publicationId: params.publicationId,
// //         metadata
// //       })

// //       if (onSuccess) onSuccess()
// //     } catch (e) {
// //       if (e instanceof Error) {
// //         setError(e.message)
// //       } else {
// //         console.error(e)
// //       }
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return {
// //     error,
// //     isLoading,
// //     logHours
// //   }
// // }

// // /**
// //  * Gets the current user that submits the log VHR hours
// //  */
// // export function getUser = (): ProfileFragment => {
// //   return null;
// // }

// const useLogHours = (params: UseLogHoursParams): UseLogHoursReturn => {
//   return {error: "", isLoading: false, logHours: {organizationId: "", jobUrl: "", hoursToVerify: "", comments: "", picture: "",}};
// }

// export default useLogHours
