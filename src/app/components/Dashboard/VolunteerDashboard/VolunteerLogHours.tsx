import {
  ArrowCircleRightIcon,
  CalendarIcon,
  ClockIcon,
  LinkIcon,
  ViewListIcon
} from '@heroicons/react/outline'
import { PublicationTypes } from '@lens-protocol/client'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ClearFilters from '@/components/Shared/ClearFilters'
import GridRefreshButton from '@/components/Shared/GridRefreshButton'
import { Spinner } from '@/components/UI/Spinner'
import { usePostData } from '@/lib/lens-protocol'
import { OpportunityMetadata, PostTags } from '@/lib/metadata'
import { useAppPersistStore } from '@/store/app'

import Error from '../Modals/Error'
import DashboardDropDown from './DashboardDropDown'
import { MOCK_DATA } from './mockData'

const inter500 = Inter({
  subsets: ['latin'],
  weight: ['500']
})

/**
 * Component that displays the volunteer log hours tab page, which displays the
 * opportunity posts that a user has bookmarked
 *
 * Bookmarked posts are fetched using the {@link usePostData} hook, and the
 * metadata post tags {@link PostTags.Bookmark.Opportunity}, which are filtered
 * using the {@link DashboardDropDown}.
 *
 * The table results are refreshed manually using the {@link GridRefreshButton}
 */
const VolunteerLogHours: React.FC = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'components.dashboard.volunteer.log-hours'
  })
  const { currentUser: profile } = useAppPersistStore()

  const { loading, data, error, refetch } = usePostData(profile?.id, {
    publicationTypes: [PublicationTypes.Comment],
    metadata: { tags: { oneOf: [PostTags.Bookmark.Opportunity] } }
  })
  const [metaData, setMetaData] = useState<OpportunityMetadata[]>([])
  const [indice, setIndice] = useState<number[]>([])
  const [categories, setCategories] = useState<string[]>([])

  // useEffect(() => {
  //   const _metaData = data
  //     .filter(isComment)
  //     .map((v) => v.mainPost)
  //     .filter((v): v is PostFragment => v.__typename === 'Post')

  //   setMetaData(getOpportunityMetadata(_metaData))
  //   setIndice(resetIndice())
  //   const _categories = new Set<string>()
  //   metaData.forEach((v) => _categories.add(v.category))
  //   setCategories(Array.from(_categories))
  // }, [data])

  useEffect(() => {
    setMetaData(MOCK_DATA as OpportunityMetadata[])
    setIndice(Array.from({ length: MOCK_DATA.length }, (_, i) => i))
    const _categories = new Set<string>()
    MOCK_DATA.forEach((v) => _categories.add(v.category))
    setCategories(Array.from(_categories))
  }, [])

  const resetIndice = () => {
    let indice = []
    for (let i = 0; i < metaData.length; i++) {
      indice.push(i)
    }
    return indice
  }

  const [selectedSortBy, setSelectedSortBy] = useState<string>('')
  const sortByOptions = [t('start-date'), t('end-date'), t('total-hours')]

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [displayIndex, setDisplayIndex] = useState(-1)

  const sortByStartDate = () => {
    indice.sort((a, b) => {
      if (metaData[a].startDate < metaData[b].startDate) return -1
      else return 1
    })
  }

  const sortByEndDate = () => {
    indice.sort((a, b) => {
      if (metaData[a].endDate < metaData[b].endDate) return -1
      else return 1
    })
  }

  const sortByHours = () => {
    indice.sort((a, b) => {
      if (metaData[a].hoursPerWeek < metaData[b].hoursPerWeek) return -1
      else return 1
    })
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 space-y-4 h-screen">
      <div className="flex py-5 w-full max-w-4xl items-center">
        <div className="mr-5 h-[50px] z-10">
          <DashboardDropDown
            label={t('sort-by')}
            selected={selectedSortBy}
            options={Array.from(sortByOptions)}
            onClick={(c) => {
              if (c == t('start-date')) {
                sortByStartDate()
              } else if (c == t('end-date')) {
                sortByEndDate()
              } else if (c == t('total-hours')) {
                sortByHours()
              }
              setSelectedSortBy(c)
            }}
          />
        </div>
        <div className="mx-5 h-[50px] z-10">
          <DashboardDropDown
            label={t('filters')}
            selected={selectedCategory}
            options={Array.from(categories)}
            onClick={(c) => setSelectedCategory(c)}
          />
        </div>
        <ClearFilters
          onClick={() => {
            setSelectedCategory('')
          }}
        />
        <GridRefreshButton onClick={refetch} />
      </div>

      <div className="flex flex-col w-full max-w-4xl overflow-auto h-[calc(100vh-200px)]">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {indice
              .filter(
                (idx) =>
                  selectedCategory === '' ||
                  metaData[idx].category == selectedCategory
              )
              .map((op) => (
                <div
                  className={`flex justify-between items-center my-5 tracking-wide w-[800px] min-h-[50px] bg-[#CEBBF8] bg-opacity-[0.50] rounded-md shadow-xl hover:bg-opacity-100 hover:cursor-pointer hover:scale-y-110 duration-100 ${
                    inter500.className
                  } ${displayIndex == op ? 'bg-blue-200' : ''}`}
                  key={op}
                  onClick={() => {
                    if (displayIndex == -1 || displayIndex != op)
                      setDisplayIndex(op)
                    else setDisplayIndex(-1)
                  }}
                >
                  <div className="flex justify-between items-center ml-10">
                    <p className="mx-5 w-[200px] h-[30px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {metaData[op].name}
                    </p>
                    <p className="mx-5 w-[100px]">{metaData[op].startDate}</p>
                    <p className="mx-5 w-[100px]">{metaData[op].endDate}</p>
                    <p className="mx-5 w-[100px] whitespace-nowrap">
                      {metaData[op].hoursPerWeek.toString().length <= 5
                        ? metaData[op].hoursPerWeek
                        : metaData[op].hoursPerWeek.toString().substring(0, 5) +
                          '...'}{' '}
                      hours
                    </p>
                  </div>
                  <a href="https://google.com" target="_blank">
                    <ArrowCircleRightIcon className="mr-10 w-6 h-6" />
                  </a>
                </div>
              ))}
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-4xl mt-5 pt-7 shadow-xl">
        <div
          className={`flex items-center justify-center w-full px-4 py-5 bg-[#CEBBF8] bg-opacity-[0.30] rounded-md shadow-md ${inter500.className}`}
        >
          <div className="w-[400px]">
            {displayIndex != -1 ? (
              <>
                <div className="flex items-center justify-start text-xl h-fit">
                  <Link
                    className="flex items-center justify-start mt-2"
                    href={`/volunteer/${metaData[displayIndex].post_id}`}
                    target="_blank"
                  >
                    <LinkIcon className="w-5 h-5 mr-2" />
                    {metaData[displayIndex].name}
                  </Link>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {metaData[displayIndex].startDate} -{' '}
                  {metaData[displayIndex].endDate.toString() === ''
                    ? t('present')
                    : metaData[displayIndex].endDate}
                </div>
                <div className="flex items-center justify-start mt-2 whitespace-nowrap">
                  <ClockIcon className="w-4 h-4 mr-2" />{' '}
                  <div className="text-ellipsis overflow-hidden w-fit max-w-[200px]">
                    {metaData[displayIndex].hoursPerWeek}
                  </div>
                  <div className="ml-2">{t('hours-in-total')}</div>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <ViewListIcon className="w-5 h-5 mr-2" />{' '}
                  {metaData[displayIndex].category}
                </div>
              </>
            ) : (
              // Display a default message or leave this empty if no row is selected
              <p>Select a row to see details.</p>
            )}
          </div>
          <div className="h-[250px] self-center w-[2px] bg-[#D8C0EC]"></div>
          <div className="flex justify-around w-[400px]">
            {displayIndex != -1 ? (
              <div className="w-[350px] mt-5 mb-5 text-ellipsis overflow-hidden">
                {metaData[displayIndex].description}
              </div>
            ) : (
              // You can also add default content here if needed
              <div className="w-[350px] mt-5 mb-5 text-center">
                Description will appear here when a row is selected.
              </div>
            )}
          </div>
        </div>
      </div>
      {error && <Error message={error}></Error>}
    </div>
  )
}

export default VolunteerLogHours
