export const openingCategories = [
  {
    id: 'opening-inconvenience',
    code: 'OP-INC',
    label: 'INCONVENIENCE',
    lines: [
      'Please accept my sincere apologies for the inconvenience this shipment has caused you.',
      'Please accept my sincere apologies for the inconvenience this situation has caused.',
    ],
  },
  {
    id: 'opening-delay',
    code: 'OP-DLY',
    label: 'DELAY',
    lines: [
      'I apologize for the delay in my response.',
      'I apologize for the delay in providing you with an update.',
    ],
  },
  {
    id: 'opening-delay-inconvenience',
    code: 'OP-DLI',
    label: 'DELAY + INCONVENIENCE',
    lines: [
      'I sincerely apologize for the delay in my response and the inconvenience this shipment has caused you.',
      'I sincerely apologize for the delay in my update and the inconvenience this has caused.',
    ],
  },
  {
    id: 'opening-unable-accommodate',
    code: 'OP-UNA',
    label: 'UNABLE TO ACCOMMODATE',
    lines: [
      'I apologize that I am unable to accommodate your request.',
      'I apologize that I am unable to accommodate this request at this time.',
    ],
  },
  {
    id: 'opening-delay-unable-accommodate',
    code: 'OP-DUA',
    label: 'DELAY + UNABLE TO ACCOMMODATE',
    lines: [
      'I apologize for the delay in my update and for being unable to accommodate your request.',
      'I apologize for the delay in my response and for being unable to accommodate your request.',
    ],
  },
  {
    id: 'opening-confusion',
    code: 'OP-CON',
    label: 'CONFUSION',
    lines: [
      'I apologize for the confusion regarding this matter.',
      'I apologize for the confusion regarding my previous email.',
    ],
  },
]

export const closingCategories = [
  {
    id: 'closing-survey-thank-you',
    code: 'CL-STY',
    label: 'SURVEY + THANK YOU',
    lines: [
      'We value your opinion. If you receive a survey, we would appreciate your time in completing it. Thank you for reaching out to FedEx.',
      'Your feedback helps us improve. If a survey is sent your way, we would be thankful for your response. Thank you for reaching out to FedEx.',
      'Should a survey arrive in your inbox, your feedback would be most welcome. Thank you for allowing us to assist you.',
    ],
  },
  {
    id: 'closing-survey-patience',
    code: 'CL-SPA',
    label: 'SURVEY + PATIENCE',
    lines: [
      'We would greatly appreciate your feedback if you receive a survey. Thank you for your patience throughout this matter.',
      'Thank you for your patience in this matter. If you receive a survey, we would be grateful for your feedback.',
      'We truly appreciate your patience. If a survey follows, your input will mean a lot to us.',
    ],
  },
  {
    id: 'closing-survey',
    code: 'CL-SRV',
    label: 'SURVEY',
    lines: [
      'Please take a moment to complete the survey if it reaches you. Your response is important to us.',
      'Your participation in our survey directly helps us improve our services. We hope you will take part.',
      'Your voice matters to us. We would truly appreciate you taking the time to fill out the survey if you receive one.',
    ],
  },
  {
    id: 'closing-thank-you',
    code: 'CL-THK',
    label: 'THANK YOU',
    lines: [
      'Thank you for reaching out to FedEx.',
      'We appreciate your interest in FedEx.',
      'Thank you for getting in touch with FedEx Premier Support.',
      'Thank you for contacting FedEx. We are happy to have assisted you today.',
      'It was our pleasure to assist you. Thank you for reaching out to FedEx.',
      'Thank you for allowing us to assist you. Have a great day.',
      'Your concern has been addressed. Thank you for contacting FedEx.',
    ],
  },
  {
    id: 'closing-patience',
    code: 'CL-PAT',
    label: 'PATIENCE',
    lines: [
      'Thank you for your patience on this matter. We are glad we could assist you today.',
      'Your patience is appreciated. Thank you for choosing FedEx.',
      'Your understanding is greatly appreciated, thank you for allowing us to assist you.',
      'We sincerely thank you for your patience and understanding.',
      'Your patience throughout this matter is truly appreciated.',
      'Thank you for your continued patience and trust in our service.',
      'Your patience has been invaluable, thank you for allowing us to assist you.',
    ],
  },
  {
    id: 'closing-hear-from-you-soon',
    code: 'CL-HRY',
    label: 'HEAR FROM YOU SOON',
    lines: [
      'I await your response with interest.',
      'I appreciate your time and hope to hear from you soon.',
      'Your reply will be greatly appreciated.',
      'I look forward to hearing from you.',
      'I hope to hear from you soon.',
      'I would appreciate a response at your convenience.',
      'I welcome your reply at your earliest convenience.',
    ],
  },
]

export const openingQuickComposePresets = [
  {
    id: 'preset-delay',
    label: 'Delay Response',
    lines: [
      'I apologize for the delay in my response.',
      'Thank you for your patience on this matter.',
    ],
  },
  {
    id: 'preset-inconvenience',
    label: 'Inconvenience Response',
    lines: [
      'Please accept my sincere apologies for the inconvenience this situation has caused.',
      'I appreciate your patience on this matter.',
    ],
  },
  {
    id: 'preset-confusion',
    label: 'Confusion Clarification',
    lines: [
      'I apologize for the confusion this has caused.',
      'Please share your experience through the survey link in our email.',
    ],
  },
]

export const closingQuickComposePresets = [
  {
    id: 'preset-thanks',
    label: 'Thank You Close',
    lines: ['Thank you for contacting us.', 'Thank you for your time and trust in our service.'],
  },
  {
    id: 'preset-patience',
    label: 'Patience Close',
    lines: [
      'I appreciate your patience on this matter.',
      'We appreciate your patience and kindly ask for your feedback through our survey.',
    ],
  },
]

export const serviceChangeGeneralCategories = [
  {
    id: 'service-change-general-default',
    code: 'SC-GEN-01',
    label: 'GENERAL',
    lines: [
      'General service change email line placeholder.',
      'General service change case note placeholder.',
    ],
  },
]

export const serviceChangeAddressCorrectionCategories = [
  {
    id: 'service-change-address-correction-in-transit',
    code: 'SC-ADR-IT',
    label: 'IN TRANSIT',
    lines: [
      'Your request to update the delivery address for the package with tracking number XXXXX has been submitted under support ticket number CCCCC. Please note that if the change can be accommodated, it may result in a delay in delivery. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER XXXX EMAILED TO REQUEST FOR ADDRESS CHANGE. INFORM SHIPPER THAT I HAVE SUBMITTED THE ADDRESS CHANGE REQUEST. ADVISE THAT THIS MAY CAUSE POSSIBLE DELAY IN DELIVERY IF WE ARE ABLE TO ACCOMMODATE THE REQUEST. SET UP SHIPMENT NOTIFICATIONS.\n\n__________________\n\n****ATTENTION: FARM restrictions for this package have been overridden per shipper. Please follow instructions. Created by FedEx One Call/Premier Customer Care.****',
    ],
  },
  {
    id: 'service-change-address-correction-out-for-delivery',
    code: 'SC-ADR-OFD',
    label: 'OUT FOR DELIVERY',
    lines: [
      'The package with tracking number XXXXX is currently out for delivery to the original address. Your address change request has been submitted under support ticket CCCCC. Please note this may result in a delay if the change can be accommodated. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER, NNNN, EMAILED TO REQUEST FOR ADDRESS CHANGE. INFORM THAT PACKAGE IS CURRENTLY OUT FOR DELIVERY TO THE ORIGINAL ADDRESS BUT I HAVE SUBMITTED THE ADDRESS CHANGE REQUEST. ADVISE THAT THIS MAY CAUSE POSSIBLE DELAY IN DELIVERY IF WE ARE ABLE TO ACCOMMODATE THE REQUEST. SET UP SHIPMENT NOTIFICATIONS.\n\n__________________\n\n****ATTENTION: FARM restrictions for this package have been overridden per shipper. Please follow instructions. Created by FedEx One Call/Premier Customer Care.****',
    ],
  },
  {
    id: 'service-change-address-correction-not-tendered',
    code: 'SC-ADR-NT',
    label: 'NOT TENDERED',
    lines: [
      'I apologize that we cannot process your request at this time. For the security of your shipment, we will be able to assist once FedEx has possession of your package under tracking number XXXXX. Please let us know if you need support after we have your shipment.',
      '',
    ],
  },
  {
    id: 'service-change-address-correction-existing',
    code: 'SC-ADR-EAC',
    label: 'EXISTING ADDRESS CORRECTION',
    lines: [
      'There is an active request to update the address for the package with tracking number XXXXX under support ticket CCCCC. I have already sent a follow-up message to the station. Please note this may result in a delay if the change can be accommodated. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #:\nEMAIL ADDRESS: \n\nPREMIER SHIPPER XXXX EMAILED REQUEST TO UPDATE THE ADDRESS. PLEASE ACKNOWLEDGE. ADVISE SHIPPER OF THE EXISTING CASE AND I HAVE SENT A FOLLOW-UP MESSAGE TO THE STATION. INFORM THAT THIS MAY CAUSE POSSIBLE DELAY IN DELIVERY IF WE ARE ABLE TO ACCOMMODATE THE REQUEST. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-address-correction-correct',
    code: 'SC-ADR-COR',
    label: 'ADDRESS IS CORRECT',
    lines: [
      'The address you provided matches our records. I have forwarded your request to notify the station that the address is correct for the package with tracking number XXXXX under support ticket CCCCC. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER NAMEEE FROM CCCCCC EMAILED SAYING THAT ADDRESS IS CORRECT. INFORM SHIPPER THAT THE ADDRESS PROVIDED DOES MATCH WITH OUR RECORDS. ADVISE THAT I HAVE FORWARDED THE REQUEST TO INFORM THE STATION THAT THE ADDRESS IS CORRECT. PLEASE ACKNOWEDGE. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-address-correction-other-country',
    code: 'SC-ADR-OC',
    label: 'ADDRESS CORRECTION OTHER COUNTRY',
    lines: [
      'My apologies, but international packages cannot be rerouted to a different country. If a delivery address change is requested within the same country, international address correction fees will apply.',
      '',
    ],
  },
  {
    id: 'service-change-address-correction-call-tag',
    code: 'SC-ADR-CT',
    label: 'CALL TAG ADDRESS CORRECTION',
    lines: [
      'I apologize that I am unable to accommodate your request. This package with tracking number XXXXX was delivered on DATE and was signed for by NAMEEEEEE. If you would like this package to be retrieved and delivered to the new address, schedule a Call Tag with the following steps:\n\n• Kindly go to fedex.com via FedEx Ship Manager\n• Select Create Return Shipment\n• Select Ground Call Tag from Return Label type dropdown in Section 3\n\nFor more information about Call Tags, you may visit: https://www.fedex.com/en-us/service-guide/return-shipments.html.',
      '',
    ],
  },
  {
    id: 'service-change-address-correction-express-tag',
    code: 'SC-ADR-ET',
    label: 'EXPRESS TAG ADDRESS CORRECTION',
    lines: [
      'I apologize that I am unable to accommodate your address correction request. This package with tracking number XXXXX was already delivered to the original address on DATE and it was signed for by/left at the PLACEEEE. If you would like this package to be retrieved and redelivered to the new address address, you may arrange for an Express Tag pick up for us to create, deliver shipping labels, and collect the item for redelivery.\n \nYou may schedule the pickup: the same day or the next business day, Monday through Friday. FedEx Express Tag labels are available through the following electronic shipping tools: FedEx Ship Manager at fedex.com (including for Shipping Administration users), FedEx Web Services and FedEx Return Manager. If you need immediate assistance in creating it, please call our Technical Support at 1-877-339-2774 and follow the appropriate prompts.',
      '',
    ],
  },
]

export const serviceChangeReturnToSenderCategories = [
  {
    id: 'service-change-return-to-sender-in-transit',
    code: 'SC-RTS-IT',
    label: 'IN TRANSIT',
    lines: [
      'Your request to return the package with tracking number XXXXX has been submitted under support ticket number CCCCC. We will make every effort to fulfill this request, and if the change is feasible, the package will be redirected to the shipper\'s address as indicated on the label. Please note that the item may still proceed to the destination station before being rerouted. Shipment notifications have been enabled for your convenience.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER, NNNN, EMAILED TO REQUEST FOR RETURN TO SHIPPER. INFORM SHIPPER THAT I HAVE SUBMITTED THE RETURN TO SHIPPER REQUEST.  ADVISE WE WILL DO OUR BEST TO HONOR THE REQUEST AND IF ABLE TO ACCOMMODATE, WE WILL RETURN THE PACKAGE TO THE SHIPPER\'S ADDRESS LISTED ON THE LABEL. WILL ADVISE PACKAGE MAY TRAVEL TO DESTINATION STATION PRIOR TO BEING RETURNED. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-return-to-sender-out-for-delivery',
    code: 'SC-RTS-OFD',
    label: 'OUT FOR DELIVERY',
    lines: [
      'The package with tracking number XXXXX is currently out for delivery. Your return-to-shipper request has been submitted under support ticket CCCCC. We will make every effort to fulfill this request, and if successful, the package will be returned to the shipper\'s address listed on the label. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER, NNNN, EMAILED TO REQUEST FOR RETURN TO SHIPPER. INFORM SHIPPER THAT PACKAGE IS CURRENTLY OUT FOR DELIVERY BUT I HAVE SUBMITTED THE RETURN TO SHIPPER REQUEST. WILL ADVISE WE WILL DO OUR BEST TO HONOR THE REQUEST AND IF ABLE TO ACCOMMODATE, WE WILL RETURN THE PACKAGE TO THE SHIPPER\'S ADDRESS LISTED ON THE LABEL. SETUP SHIPMENT NOTIFICATIONS. ',
    ],
  },
  {
    id: 'service-change-return-to-sender-not-tendered',
    code: 'SC-RTS-NT',
    label: 'NOT TENDERED',
    lines: [
      'I apologize that we cannot process your request at this time. For the security of your shipment, we will be able to assist once FedEx has possession of your package under tracking number XXXXX. Please let us know if you need support after we have your shipment.',
      '',
    ],
  },
  {
    id: 'service-change-return-to-sender-existing',
    code: 'SC-RTS-EX',
    label: 'EXISTING RETURN TO SENDER',
    lines: [
      'There is an active return-to-shipper request for the package with tracking number XXXXX under support ticket CCCCC, and I have sent a follow-up message. We will make every effort to honor this request, and if successful, the package will be returned to the shipper\'s address listed on the label. Please note it may still travel to the destination station before being returned. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER XXXX FROM CCCC EMAILED REQUEST FOR RETURN TO SHIPPER. PLEASE ACKNOWLEDGE. ADVISE SHIPPER OF THE EXISTING RETURN TO SENDER CASE AND I HAVE SENT A FOLLOW-UP MESSAGE. INFORM THAT WE WILL DO OUR BEST TO HONOR THE REQUEST AND IF ABLE TO ACCOMMODATE, WE WILL RETURN THE PACKAGE TO THE SHIPPER\'S ADDRESS LISTED ON THE LABEL. WILL ADVISE PACKAGE MAY TRAVEL TO DESTINATION STATION PRIOR TO BEING RETURNED. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-return-to-sender-discard-destroy',
    code: 'SC-RTS-DD',
    label: 'DISCARD/DESTROY',
    lines: [
      'Your request to discard/destroy/abandon the shipment with tracking number XXXXX has been submitted under support ticket number CCCCC. Moreover, it may still travel to the destination station prior to being accommodate. I have set you up to receive shipment notifications.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER NNNN FROM CCCC EMAILED REQUEST TO DISCARD/DESTROY THE PACKAGE. PLEASE ACKNOWLEDGE. ADVISE SHIPPER REQUEST HAS BEEN SUBMITTED. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-return-to-sender-fraud',
    code: 'SC-RTS-FR',
    label: 'FRAUD RETURN TO SENDER',
    lines: [
      '',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER XXXX EMAILED REQUEST FOR RETURN TO SHIPPER. PLEASE ACKNOWLEDGE. ADVISE SHIPPER REQUEST HAS BEEN SUBMITTED. INFORM SHIPPER WE WILL DO OUR BEST TO HONOR YOUR REQUEST AND IF WE ARE ABLE TO ACCOMMODATE THE CHANGE, WE WILL RETURN THE PACKAGE AT THE PAYER\'S EXPENSE. ALSO, ADVISE SHIPPER THAT THE PACKAGE MAY TRAVEL TO THE NEXT DELIVERY STATION PRIOR TO BEING RETURNED. SET UP SHIPMENT NOTIFICATIONS.\n\n***FRAUD SHIPMENT*** ***FRAUD SHIPMENT*** ***FRAUD SHIPMENT***',
    ],
  },
  {
    id: 'service-change-return-to-sender-call-tag',
    code: 'SC-RTS-CT',
    label: 'CALL TAG RETURN TO SENDER',
    lines: [
      'I apologize that I am unable to accommodate your request. This package with tracking number XXXXX was delivered on DATE and was signed for by NAMEEEEEE. If you would like this package to be retrieved and returned to the shipper\'s address, schedule a Call Tag with the following steps:\n\n• Kindly go to fedex.com via FedEx Ship Manager\n• Select Create Return Shipment\n• Select Ground Call Tag from Return Label type dropdown in Section 3\n\nFor more information about Call Tags, you may visit: https://www.fedex.com/en-us/service-guide/return-shipments.html.',
      '',
    ],
  },
  {
    id: 'service-change-return-to-sender-express-tag',
    code: 'SC-RTS-ET',
    label: 'EXPRESS TAG RETURN TO SENDER',
    lines: [
      'I apologize that I am unable to accommodate your request. This package with tracking number XXXXX was already delivered to the original address DATE and it was signed for by/ left at the PLACEEEE. If you would like this package to be retrieved and returned to the shipper\'s address, you may arrange for an Express Tag pick up for us to create, deliver return shipping labels, and collect the item for return.\n \nYou may schedule the pickup: the same day or the next business day, Monday through Friday. FedEx Express Tag labels are available through the following electronic shipping tools: FedEx Ship Manager at fedex.com (including for Shipping Administration users), FedEx Web Services and FedEx Return Manager. If you need immediate assistance in creating it, please call our Technical Support at 1-877-339-2774 and follow the appropriate prompts. ',
      '',
    ],
  },
]

export const serviceChangeHoldAtLocationCategories = [
  {
    id: 'service-change-hold-at-location-standard',
    code: 'SC-HAL-STD',
    label: 'HOLD AT LOCATION',
    lines: [
      'Your request to hold the package with tracking number XXXXX for pickup at LOCADDRESS has been submitted. This request is linked to support ticket number CCCCC.\n\nThe location operates during the following hours:\nMonday to Friday: X:00 AM to X:00 PM\nSaturday: X:00 AM to X:00 PM\nSunday: X:00 PM to X:00 PM\n\nWe will make every effort to accommodate this request. To collect the package, the recipient must bring the tracking or door tag number along with a government-issued photo ID. The address on the ID must match the shipping label. Alternatively, you may present the QR code, which does not require an ID or tracking number. The package will be held for 5 business days. If it is not collected within this time, it will be returned to the sender. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER, NNNN, EMAILED TO REQUEST TO HOLD THE PACKAGE FOR PICKUP. SET UP SHIPMENT NOTIFICATIONS AND WILL ADVISE OF THE FOLLOWING:\n\n• PROVIDE LOCATION ADDRESS AND BUSINESS HOURS\n• WE WILL DO OUR BEST TO ACCOMMODATE REQUEST\n• WILL ASK TO ADVISE THE RECIPIENT TO BRING TRACKING/DOOR TAG NUMBER AND GOVERNMENT ISSUED PHOTO ID OR SHOW QR CODE UPON PICKUP\n• ADDRESS ON ID MUST MATCH ADDRESS ON THE LABEL\n• WILL BE HELD FOR 5 BUSINESS DAYS AND IF NOT PICKED UP, IT WILL BE RETURN TO SENDER\n__________________\n\n****ATTENTION: FARM restrictions for this package have been overridden per shipper. Please follow instructions. Created by FedEx One Call/Premier Customer Care.****',
    ],
  },
  {
    id: 'service-change-hold-at-location-adult-signature',
    code: 'SC-HAL-AS',
    label: 'HOLD AT LOCATION WITH ADULT SIGNATURE',
    lines: [
      'Your request to hold the package with tracking number XXXXX for pickup at LOCADDRESS has been submitted. This request is linked to support ticket number CCCCC.\n\nThe location operates during the following hours:\nMonday to Friday: X:00 AM to X:00 PM\nSaturday: X:00 AM to X:00 PM\nSunday: X:00 PM to X:00 PM\n\nWe will make every effort to accommodate this request. The location will contact the recipient once the package is ready for pickup. Please advise the recipient to bring the tracking or door tag number and a government-issued photo ID, or present the QR code (no ID or tracking number required). The address on the ID must match the shipping label. Since this shipment requires an Adult Signature, the ID must confirm proof of age (21 or older). The package will be held for 5 business days; if not collected within that time, it will be returned to the sender. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER, NNNN, EMAILED TO REQUEST TO HOLD THE PACKAGE FOR PICKUP. SET UP SHIPMENT NOTIFICATIONS AND WILL ADVISE OF THE FOLLOWING:\n\n• PROVIDE LOCATION ADDRESS AND BUSINESS HOURS\n• WE WILL DO OUR BEST TO ACCOMMODATE REQUEST\n• THE HOLD LOCATION WILL CONTACT THE RECIPIENT ONCE AVAILABLE FOR PICKUP\n• WILL ASK TO ADVISE THE RECIPIENT TO BRING TRACKING/DOOR TAG NUMBER AND GOVERNMENT ISSUED PHOTO ID OR SHOW QR CODE UPON PICKUP\n• ADDRESS ON ID MUST MATCH ADDRESS ON THE LABEL\n• SINCE ADULT SIGNATURE REQUIRED, GOVERNMENT PHOTO ISSUED ID MUST SHOW PROOF OF AGE (AT LEAST 21)\n• WILL BE HELD FOR 5 BUSINESS DAYS AND IF NOT PICKED UP, IT WILL BE RETURN TO SENDER\n__________________\n\n****ATTENTION: FARM restrictions for this package have been overridden per shipper. Please follow instructions. Created by FedEx One Call/Premier Customer Care.****',
    ],
  },
  {
    id: 'service-change-hold-at-location-adult-signature-ofd',
    code: 'SC-HAL-ASO',
    label: 'HOLD AT LOCATION WITH ADULT SIGNATURE AND OUT FOR DELIVERY',
    lines: [
      'The package with tracking number XXXXX is out for delivery today. We have submitted your request to redirect and hold it for pickup at LOCADDRESS. This request is linked to support ticket number CCCCC.\n\nThe location operates during the following hours:\nMonday to Friday: X:00 AM to X:00 PM\nSaturday: X:00 AM to X:00 PM\nSunday: X:00 PM to X:00 PM\n\nWe will make every effort to accommodate this request. The location will notify the recipient when the package is ready for pickup. To collect the package, the recipient must bring the tracking or door tag number and a government-issued photo ID. The address on the ID must match the shipping label. Alternatively, you may present the QR code, which does not require an ID or tracking number. This shipment requires an Adult Signature. The ID must confirm proof of age (21 or older). The package will be held for 5 business days. If it is not collected within this time, it will be returned to the sender. You are now enrolled to receive shipment notifications. These updates will be sent to the email address you provided to keep you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF NUMBER: \nEMAIL: \n\nPREMIER SHIPPER NNNN, EMAILED TO REQUEST TO HOLD THE PACKAGE FOR PICKUP. WILL ADVISE PACKAGE IS OUT FOR DELIVERY TODAY. SET UP SHIPMENT NOTIFICATIONS AND WILL ADVISE OF THE FOLLOWING:\n\n• PROVIDE LOCATION ADDRESS AND BUSINESS HOURS\n• IF ABLE TO ACCOMMODATE REQUEST, THE HOLD LOCATION WILL CONTACT THE RECIPIENT ONCE AVAILABLE FOR PICKUP\n• WILL ASK TO ADVISE THE RECIPIENT TO BRING TRACKING/DOOR TAG NUMBER AND GOVERNMENT ISSUED PHOTO ID OR SHOW QR CODE UPON PICKUP\n• ADDRESS ON ID MUST MATCH ADDRESS ON THE LABEL\n• SINCE ADULT SIGNATURE REQUIRED, GOVERNMENT PHOTO ISSUED ID MUST SHOW PROOF OF AGE (AT LEAST 21)\n• WILL BE HELD FOR 5 BUSINESS DAYS AND IF NOT PICKED UP, IT WILL BE RETURN TO SENDER\n__________________\n\n****ATTENTION: FARM restrictions for this package have been overridden per shipper. Please follow instructions. Created by FedEx One Call/Premier Customer Care.****',
    ],
  },
  {
    id: 'service-change-hold-at-location-existing',
    code: 'SC-HAL-EX',
    label: 'EXISTING HOLD AT LOCATION',
    lines: [
      'There is an active request to hold the package with tracking number XXXXX for pickup at LOCADDRESS under support ticket CCCCC.\n\nThe location operates during the following hours:\nMonday to Friday: X:00 AM to X:00 PM\nSaturday: X:00 AM to X:00 PM\nSunday: X:00 PM to X:00 PM\n\nWe will make every effort to fulfill this request. To collect the package, the recipient must bring the tracking or door tag number and a government-issued photo ID. The address on the ID must match the shipping label. Alternatively, you may present the QR code, which does not require an ID or tracking number. The package will be held for 5 business days. If it is not collected within this time, it will be returned to the sender. You are now enrolled to receive shipment notifications. These updates will be sent to the email address you provided to keep you informed of your package status.',
      '',
    ],
  },
]

export const serviceChangeReAttemptCategories = [
  {
    id: 'service-change-re-attempt-standard',
    code: 'SC-REA-STD',
    label: 'REATTEMPT',
    lines: [
      'I have forwarded your request to reattempt the delivery of the package with tracking number XXXXX under support ticket number CCCCC. I have set you up to receive shipment notifications. ',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER NNN EMAILED REQUEST FOR REATTEMPT TODAY. ADVISE SHIPPER REQUEST HAS BEEN FORWARDED. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-re-attempt-past-cut-off',
    code: 'SC-REA-PCO',
    label: 'REATTEMPT PAST CUT OFF',
    lines: [
      'I have forwarded your request to reattempt the delivery of the package with tracking number XXXXX under support ticket number CCCCC. Rest assured that we will do our best to accommodate this request. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER NNN FROM CCCC EMAILED REQUEST FOR REATTEMPT TODAY. ADVISE SHIPPER REQUEST HAS BEEN FORWARDED BUT THERE IS NO GUARANTEE AND SUBJECT FOR APPROVAL. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
]

export const serviceChangeVacationHoldCategories = [
  {
    id: 'service-change-vacation-hold',
    code: 'SC-VCH',
    label: 'VACATION HOLD',
    lines: [
      'I have submitted your request for the package with tracking number XXXXX under support ticket number CCCCC. The package may still travel to the destination station prior to being processed. I will update you with any information on CALLBACK by 8:00 PM CT. Shipment notifications have been set up and will be sent to the email address you provided, keeping you informed of your package status.',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER XXXX EMAILED REQUEST TO SCHEDULE THE DELIVERY ON _____. PLEASE ACKNOWLEDGE. ADVISE SHIPPER REQUEST HAS BEEN SUBMITTED. ADVISE SHIPPER THAT THE SHIPMENT MAY STILL TRAVEL TO THE NEXT LOCATION BEFORE PROCESSING THE CHANGE. ALSO, ADVISE THAT THE SHIPMENT IS CURRENTLY ((IN TRANSIT/OUT FOR DELIVERY)), WE WILL DO OUR BEST TO HONOR YOUR REQUEST. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
  {
    id: 'service-change-vacation-hold-cancel-scan-34',
    code: 'SC-VCH-CS34',
    label: 'CANCEL SCAN 34 / VACATION HOLD',
    lines: [
      '',
      '$$ HIGH REVENUE SHIPPER/PREMIER CUSTOMER CARE/JOSE MIGUEL SANTIAGO/1-877-780-0230 $$\nSF #: \nEMAIL ADDRESS: \n\nPREMIER SHIPPER XXXX FROM CCCC EMAILED AND STATED THAT THEY DID NOT REQUEST FOR VACATION HOLD AND BEEN WAITING FOR THIS DELIVERY TODAY. PLEASE CANCEL THE HOLD AND PROCEED WITH THE DELIVERY AS SOON AS POSSIBLE. SET UP SHIPMENT NOTIFICATIONS.',
    ],
  },
]













