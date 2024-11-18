import imgQuality from "../assets/imgQuality.png";
import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

function CotizacionesPDF({
  fechaEmision,
  fechaVigencia,
  cliente,
  productos,
  negocio,
  totalSinIva,
  iva,
  total,
  personal,
}) {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },
    imgQuality: {
      height: 60,
      width: 100,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    fontSmall: { fontSize: 10, marginTop: 20 },
    fontMedium: {
      fontSize: 10,
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    table: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
      marginTop: 15,
      gap: 10,
    },
    tableRows: {
      display: "flex",
      justifyContent: "flex-end",
    },
    fontBold: {
      fontSize: 13,
    },
    price: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
      gap: 5,
      marginTop: 10,
      justifyContent: "flex-end",
    },
    atencion: {
      textAlign: "center",
      fontSize: 10,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
    },
    footer: {
      textAlign: "center",
      fontSize: 10,
    },
    centerText: { textAlign: "center" },
    footerText: {
      marginTop: 5,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src={imgQuality} style={styles.imgQuality}></Image>
          <View>
            <Text style={styles.fontMedium}>Emitido: {fechaEmision}</Text>
            <Text style={styles.fontMedium}>Vigencia: {fechaVigencia}</Text>
          </View>
        </View>
        <View style={styles.fontMedium}>
          <View>
            <Text>A quien corresponda:</Text>
            <Text>{negocio}</Text>
          </View>
          <Text>{cliente}</Text>
          <Text>PRESENTE</Text>
          <Text style={styles.fontSmall}>
            Por medio de este presente, le envio a usted la COTIZACION para los
            trabajos que con anterioridad nos solicito:
          </Text>
        </View>
        <View style={styles.table}>
          <View>
            <Text style={styles.fontBold}>Cantidad</Text>
            <View>
              {/*<Text>1</Text>
              <Text>1</Text>
              <Text>1</Text>
              <Text>1</Text>
              <Text>3</Text>*/}
              {productos.map((item, i) => (
                <Text key={i}>{item.cantidad}</Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.fontBold}>Descripcion</Text>
            <View>
              {/*<Text>Impresion en PVC 3mm escuela activa integral</Text>
              <Text>Impresion en PVC 3mm escuela activa integral</Text>
              <Text>Impresion en PVC 3mm escuela activa integral</Text>
              <Text>Impresion en PVC 3mm escuela activa integral</Text>
              <Text>Impresion de lona escuela activa integral</Text>*/}
              {productos.map((item, i) => (
                <Text key={i}>{item.Descripcion}</Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.fontBold}>Medida/Unidad</Text>
            <View>
              {/*<Text>1.50 X 1.50</Text>
              <Text>1.00 X 1.00</Text>
              <Text>1.40 X 0.60</Text>
              <Text>2.00 X 0.65</Text>
              <Text>0.60 X 1.60</Text>*/}
              {productos.map((item, i) => (
                <Text key={i}>
                  {item.prod_base} X {item.prod_altura}
                </Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.fontBold}>Precio unitario</Text>
            <View>
              {/*<Text>$1,125.00</Text>
              <Text>$500.00</Text>
              <Text>$500.00</Text>
              <Text>$650.00</Text>
              <Text>$150.00</Text>*/}
              {productos.map((item, i) => (
                <Text key={i}>{item.precio_Uni}</Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.fontBold}>Total</Text>
            <View style={styles.tableRows}>
              {/*<Text>$1,125.00</Text>
              <Text>$500.00</Text>
              <Text>$500.00</Text>
              <Text>$650.00</Text>
              <Text>$150.00</Text>*/}
              {productos.map((item, i) => (
                <Text key={i}>{item.importe}</Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.price}>
          <View>
            <Text>Total sin IVA</Text>
            <Text>IVA</Text>
            <Text>TOTAL NETO</Text>
          </View>
          <View>
            <Text>{totalSinIva}</Text>
            <Text>{iva}</Text>
            <Text>{total}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Estoy a sus ordenes para cualquier duda o aclaracion
          </Text>
          <Text style={styles.footerText}>{personal}</Text>
          <Text style={styles.footerText}>ATENCION A CLIENTES</Text>
          <Text style={styles.footerText}>
            JUAN DE DIOS BATIZ 797 COL. INDUSTRIA BRAVO C.P. 80120
          </Text>
          <Text style={styles.footerText}>
            Telefono oficina matriz 712 1588 celular 6671 292462
          </Text>
          <Text style={styles.footerText}>
            Correo electronico: recepcion_qualityart@hotmail.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}
export default CotizacionesPDF;
