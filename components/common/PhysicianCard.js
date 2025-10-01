import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PhysicianCard({ physician }) {
  const physicianName = `${physician.firstName} ${physician.lastName}`;
  const physicianNameWithDegree = `${physicianName} ${physician.degree || ''}`.trim();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Physician Image */}
      <div className="relative h-48 bg-gray-100">
        {physician.profileImageUrl ? (
          <Image
            src={physician.profileImageUrl}
            alt={physicianName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              {physician.firstName?.[0]}{physician.lastName?.[0]}
            </div>
          </div>
        )}
      </div>

      {/* Physician Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">
          <Link 
            href={`/physicians/${physician.slug}/`}
            className="hover:text-secondary transition-colors duration-200"
          >
            {physicianNameWithDegree}
          </Link>
        </h3>

        {/* Specialties */}
        {physician.specialties && physician.specialties.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {physician.specialties.slice(0, 2).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
              {physician.specialties.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{physician.specialties.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Practice */}
        {physician.practiceName && (
          <p className="text-sm text-blue-600 font-medium mb-2">
            {physician.practiceName}
          </p>
        )}

        {/* Location */}
        {(physician.city || physician.state) && (
          <p className="text-sm text-gray-600 mb-3">
            📍 {physician.city}{physician.state ? `, ${physician.state}` : ''}
          </p>
        )}

        {/* Phone */}
        {physician.phoneNumber && (
          <p className="text-sm text-gray-600 mb-3">
            📞 <a 
              href={`tel:${physician.phoneNumber}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {physician.phoneNumber}
            </a>
          </p>
        )}

        {/* Languages */}
        {physician.languages && physician.languages.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Languages:</p>
            <p className="text-sm text-gray-600">
              {physician.languages.slice(0, 3).join(', ')}
              {physician.languages.length > 3 && ` +${physician.languages.length - 3} more`}
            </p>
          </div>
        )}

        {/* Primary Care Badge */}
        {physician.primaryCare && (
          <div className="inline-block">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Primary Care
            </span>
          </div>
        )}

        {/* View Profile Button */}
        <div className="mt-4">
          <Link 
            href={`/physicians/${physician.slug}/`}
            className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200 text-center block text-sm font-medium"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}