"use client";

import React from "react";
import { Font, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { fDate } from "src/utils/format-time";
import Button from "@mui/material/Button";
import Iconify from "src/components/iconify";

Font.register({
  family: "Poppins",
  fonts: [
    { src: "/fonts/Poppins-Regular.ttf", fontWeight: "normal" }, // fontWeight is optional for 'normal'
    { src: "/fonts/Poppins-Bold.ttf", fontWeight: "bold" },
    // Add other weights/styles if you need them (e.g., Italic, SemiBold)
    { src: "/fonts/Poppins-Italic.ttf", fontStyle: "italic" },
    { src: "/fonts/Poppins-SemiBold.ttf", fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 40,
    fontFamily: "Poppins",
    fontSize: 9,
    color: "#333333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  logoContainer: {
    width: 90,
    height: 40,
  },
  voucherHeader: {
    alignItems: "flex-end",
  },
  voucherText: {
    fontSize: 10,
    color: "#555555",
    marginBottom: 2,
  },
  voucherNumber: {
    fontSize: 16,
    color: "#06B6D4",
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#F97316",
    marginBottom: 20,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  starImage: {
    width: 11,
    height: 11,
    marginRight: 2,
  },
  noRatingText: {
    fontSize: 9,
    color: "#AAAAAA",
    fontStyle: "italic",
  },
  infoSection: {
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#000000",
  },
  infoContent: {
    fontSize: 10,
    color: "#444444",
  },
  checkInOutContainer: {
    flexDirection: "row",
    marginTop: 3,
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "stretch",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#E5E7EB",
    borderBottomColor: "#E5E7EB",
    paddingVertical: 5,
  },
  checkInSection: {
    width: "33%",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  checkInLabel: {
    fontSize: 10,
    color: "#06B6D4",
    fontWeight: "bold",
    marginBottom: 3,
  },
  checkInValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  durationSection: {
    width: "34%",
    borderLeftWidth: 1,
    borderLeftColor: "#D1D5DB",
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  durationLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#06B6D4",
  },
  durationValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  checkOutSection: {
    // alignItems: "center", // Center text
    width: "33%",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  checkOutLabel: {
    fontSize: 10,
    color: "#06B6D4",
    fontWeight: "bold",
    marginBottom: 3,
  },
  checkOutValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  bookingDetailContainer: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  bookingDetailTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#06B6D4",
    marginBottom: 15,
    textAlign: "left",
  },
  // Table 1: Guest Info
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#06B6D4",
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 4,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#06B6D4",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  // Table 2: Room Type Info
  roomTypeContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  roomTypeHeader: {
    flexDirection: "row",
    backgroundColor: "#06B6D4",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  roomTypeHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  roomTypeRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  roomTypeCell: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    color: "#333333",
  },
  specialRequestNote: {
    fontSize: 8,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#6B7280",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  policyNotesContainer: {
    marginTop: 5,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    marginRight: 5,
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    color: "#444444",
  },
  indentedBulletItem: {
    flexDirection: "row",
    marginBottom: 4,
    marginLeft: 15,
    paddingLeft: 5,
  },
});

// Create Document Component
const OrderDetailsPDF = ({ detail, options }) => {
  const bookingCode = detail?.hotel_order?.BookingCode || "N/A";
  const hotelInfo = detail?.hotel_order?.HotelInformation || {};
  const guest = detail?.hotel_order?.Passengers?.[0] || {};
  const incrementId = detail?.increment_id || "EXAMPLE123";

  const renderStars = (count) => {
    const stars = [];
    const starCount = parseInt(count, 10);

    if (!isNaN(starCount) && starCount > 0) {
      for (let i = 0; i < starCount; i++) {
        stars.push(
          // Use Image component (MAKE SURE THE IMAGE PATH IS CORRECT)
          <Image key={i} src="/star-logo.png" style={styles.starImage} />
        );
      }
    } else {
      stars.push(
        <Text key="no-rating" style={styles.noRatingText}>
          (No rating available)
        </Text>
      );
    }
    return stars;
  };

  // Default values matching image 1 if data is missing
  const defaultHotelName = "No Hotel name available*";
  const defaultAddress = "No address found";
  const defaultPhone = "Missing Phone default number";
  const defaultCheckIn = "1924-05-10";
  const defaultCheckOut = "1924-05-11";
  const defaultNights = "";
  const defaultGuestTitle = "";
  const defaultGuestName = "";
  const defaultRoomCategory = "";
  const defaultMeal = "";
  const defaultCancellation = "";
  const defaultVoucherId = "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logoContainer} />
          <View style={styles.voucherHeader}>
            <Text style={styles.voucherText}>Voucher Hotel</Text>
            <Text style={styles.voucherNumber}>{incrementId ? `LDN${incrementId}` : defaultVoucherId}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.hotelName}>{hotelInfo.HotelName || defaultHotelName}</Text>
        <View style={styles.stars}>{renderStars(hotelInfo.StarLevel)}</View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Alamat:</Text>
          <Text style={styles.infoContent}>{hotelInfo.Address || defaultAddress}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>No Telepon:</Text>
          {/* Use billing phone if available, else default */}
          <Text style={styles.infoContent}>{detail?.billing_address?.telephone || hotelInfo.Phone || defaultPhone}</Text>
        </View>

        <View style={styles.checkInOutContainer}>
          <View style={styles.checkInSection}>
            <Text style={styles.checkInLabel}>Check In:</Text>
            <Text style={styles.checkInValue}>{hotelInfo.CheckIn ? fDate(hotelInfo.CheckIn) : fDate(defaultCheckIn)}</Text>
          </View>

          <View style={styles.durationSection}>
            <Text style={styles.durationLabel}>Duration:</Text>
            {/* Added fallback and pluralization logic */}
            <Text style={styles.durationValue}>{`${hotelInfo.NightStay || defaultNights} night${(hotelInfo.NightStay || defaultNights) > 1 ? "s" : ""}`}</Text>
          </View>

          <View style={styles.checkOutSection}>
            <Text style={styles.checkOutLabel}>Check Out:</Text>
            <Text style={styles.checkOutValue}>{hotelInfo.CheckOut ? fDate(hotelInfo.CheckOut) : fDate(defaultCheckOut)}</Text>
          </View>
        </View>

        <View style={styles.bookingDetailContainer}>
          {/* <Text style={styles.bookingDetailTitle}>Booking Detail</Text> */}

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Room</Text>
            <Text style={styles.tableHeaderCell}>Guest Name</Text>
            <Text style={styles.tableHeaderCell}>Bed Type</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>
              {/* Adjusted fallback logic */}
              {`${guest.Title || defaultGuestTitle}. ${guest.FirstName || defaultGuestName}`}
            </Text>
            {/* Simplified Bed Type logic based on image */}
            <Text style={styles.tableCell}>Single</Text>
          </View>

          <View style={styles.roomTypeContainer}>
            <View style={styles.roomTypeHeader}>
              <Text style={styles.roomTypeHeaderCell}>Room type</Text>
              <Text style={styles.roomTypeHeaderCell}>Includes</Text>
              <Text style={styles.roomTypeHeaderCell}>Booking ID</Text>
            </View>

            <View style={styles.roomTypeRow}>
              <Text style={styles.roomTypeCell}>{hotelInfo.RoomCategory || defaultRoomCategory}</Text>
              <Text style={styles.roomTypeCell}>{hotelInfo.Meal || defaultMeal}</Text>
              {/* Use the bookingCode variable */}
              <Text style={styles.roomTypeCell}>{bookingCode !== "N/A" ? bookingCode : defaultVoucherId /* Fallback if booking code is also missing */}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.specialRequestNote}>
          Special request may depend on hotel's availability at check-in and may cost extra fee. Special request availability is not guaranteed. Hotel may charge you additional fee for each extra person after reserved room's maximum
          capacity.
        </Text>

        <View style={styles.policyNotesContainer}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            {/* Handle potential missing cancellation info */}
            <Text style={styles.bulletText}>Free Cancellation before {hotelInfo.CancellationPolicies?.[0]?.Deadline ? fDate(hotelInfo.CancellationPolicies[0].Deadline, "eee, dd MMM yyyy") : defaultCancellation}</Text>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>Notes</Text>
          {/* Static Notes Section as per Image 1 */}
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Remark:- </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Child and Extra Bed Policy:-</Text>
          </View>
          <View style={styles.indentedBulletItem}>
            <Text style={styles.bulletPoint}>-</Text>
            <Text style={styles.bulletText}>Guest's Age: Children 1-1 year's</Text>
          </View>
          <View style={styles.indentedBulletItem}>
            <Text style={styles.bulletPoint}>-</Text>
            <Text style={styles.bulletText}>Extra Bed: Must use an extra bed. If you need an extra bed, it will incur an additional charges.</Text>
          </View>
          <View style={styles.indentedBulletItem}>
            <Text style={styles.bulletPoint}>-</Text>
            <Text style={styles.bulletText}>Guest's Age: Guests 2 years and older are considered as adults</Text>
          </View>
          <View style={styles.indentedBulletItem}>
            <Text style={styles.bulletPoint}>-</Text>
            <Text style={styles.bulletText}>Extra Bed: Must use an extra bed which will incur an additional charge.</Text>
          </View>
          <View style={styles.indentedBulletItem}>
            <Text style={styles.bulletPoint}>-</Text>
            <Text style={styles.bulletText}>Infant Age: 0</Text>
          </View>
          <View style={styles.indentedBulletItem}>
            <Text style={styles.bulletPoint}>-</Text>
            <Text style={styles.bulletText}>Minimum Guest Age: 0</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Download Button Component (Unchanged Structure)
const DownloadPDFButton = ({ detail, options }) => {
  const incrementId = detail?.increment_id || "voucher";
  return (
    <PDFDownloadLink document={<OrderDetailsPDF detail={detail} options={options} />} fileName={`order-voucher-${incrementId}.pdf`} style={{ textDecoration: "none" }}>
      {({ blob, url, loading, error }) => (
        <Button variant="contained" startIcon={<Iconify icon="material-symbols:download" />} sx={{ mt: 2, mb: 2 }} disabled={loading}>
          {loading ? "Generating PDF..." : "Unduh Voucher"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export { OrderDetailsPDF, DownloadPDFButton };
